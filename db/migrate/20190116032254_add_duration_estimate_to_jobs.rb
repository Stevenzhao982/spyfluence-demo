class AddDurationEstimateToJobs < ActiveRecord::Migration[5.2]
  def change
    add_column :jobs, :completion_estimate, :datetime
  end
end
