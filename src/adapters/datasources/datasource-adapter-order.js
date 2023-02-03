export const DataSourceAdapterOrder = function (
  url,
  cacheSize,
  DataSourceFile
) {
  /**
   * Datasource adapter for AWS Dynamo DB
   */
  class DataSourceOrder extends DataSourceFile {
    save (id, data) {
      super.save(id, data)
      console.log('DataSourceFileOrder', id, data)
    }
  }

  return DataSourceOrder
}
