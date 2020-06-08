class AddModeToJobs < ActiveRecord::Migration[5.2]
  def change
    add_column :jobs, :mode, :string
  end
end
