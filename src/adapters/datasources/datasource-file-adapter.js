export const DataSourceFileAdapter = function (url, cacheSize, DataSourceFile) {
  /**
   * Datasource adapter for AWS Dynamo DB
   */
  class DataSourceFileOrder extends DataSourceFile {
    save(id, data) {
      super.save(id, data);
      console.log("DataSourceFileOrder datasource", id, data);
    }
  }

  return DataSourceFileOrder;
};
