export const DataSourceAdapterCustomer = function (
  url,
  cacheSize,
  DataSourceFile
) {
  /**
   * Datasource adapter for AWS Dynamo DB
   */
  class DataSourceCustomer extends DataSourceFile {
    save (id, data) {
      super.save(id, data)
    }
  }

  return DataSourceCustomer
}
