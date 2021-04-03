export const DataSourceAdapterDynamo = function (
  url,
  DataSourceMemory,
  cacheSize = 2000
) {
  /**
   * Datasource adapter for AWS Dynamo DB
   */
  class DataSourceDynamoDb extends DataSourceMemory {
    save(id, data) {
      super.save(id, data);
      console.log("dynamo db", id, data);
    }
  }

  return DataSourceDynamoDb;
};
