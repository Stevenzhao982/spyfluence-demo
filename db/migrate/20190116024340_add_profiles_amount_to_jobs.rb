class AddProfilesAmountToJobs < ActiveRecord::Migration[5.2]
  def change
    add_column :jobs, :profiles, :integer
  end
end
