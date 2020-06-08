class ApplicationRecord < ActiveRecord::Base
  extend DatabaseQueryStreaming

  self.abstract_class = true
end
