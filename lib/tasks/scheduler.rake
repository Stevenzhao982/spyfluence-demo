require 'bunny'

desc "scale workers and queue valid jobs with scrapper info on RabbitMQ"
task run_jobs: :environment do
  Heroku.instance.client.formation.update 'spyfluence', 'worker', { quantity: 0 }
  sleep(1.minute)

  conn = Bunny.new(ENV['CLOUDAMQP_URL'])
  conn.start
  channel = conn.create_channel
  queue = channel.queue(ENV['CLOUDAMQP_QUEUE'], durable: true, auto_delete: false)

  jobs = Job.includes(:user, :competitor).where(status: ['created', 'crashed'])
  scrappers = Scrapper.where(status: "free").limit(jobs.length)
  Rails.logger.tagged('JOBS') { Rails.logger.info("BEGIN queuing up #{jobs.length} jobs.") }

  if jobs.length > scrappers.length
    Rails.logger.tagged('JOBS') { Rails.logger.info("WARNING not enough scrappers (#{scrappers.length}) for jobs (#{jobs.length})") }
    AdminNotifierMailer.not_enough_scrappers(jobs.length - scrappers.length).deliver
  end

  scrappers.each_with_index do |scrapper, index| 
    queue.publish("{
      \"email\": \"#{jobs[index].user.email}\",
      \"job\": {
        \"id\": #{jobs[index].id},
        \"status\": \"#{jobs[index].status}\",
        \"error\": \"#{jobs[index].error}\",
        \"bookmark_cursor\": \"#{jobs[index].bookmark_cursor}\",
        \"bookmark_profile\": \"#{jobs[index].bookmark_profile}\"
      },
      \"competitor\": {
        \"account\": \"#{jobs[index].competitor.account}\",
        \"id\": #{jobs[index].competitor.id}
      },
      \"mode\": \"#{jobs[index].mode}\",
      \"scrapper\": {
        \"id\": #{scrapper.id},
        \"username\": \"#{scrapper.username}\",
        \"password\": \"#{scrapper.password}\"
      }
    }", persistent: true)

    Rails.logger.tagged('JOBS') { Rails.logger.info("queued up job: #{jobs[index].id}") }
  end

  Heroku.instance.client.formation.update 'spyfluence', 'worker', { quantity: jobs.length, size: "Standard-1X" }

  conn.close
end
