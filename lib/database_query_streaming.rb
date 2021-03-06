module DatabaseQueryStreaming

    def stream_query_rows(sql_query, options="WITH CSV HEADER")
      conn = ActiveRecord::Base.connection.raw_connection
      conn.copy_data "COPY (#{sql_query}) TO STDOUT #{options};" do
        while row = conn.get_copy_data
          yield row
        end
      end
    end
  
end