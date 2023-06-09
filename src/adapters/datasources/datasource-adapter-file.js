export const DataSourceAdapterCustomFile = function (
  url,
  cacheSize,
  DataSourceFile
) {
  /**
   * Datasource adapter for AWS Dynamo DB
   */
  class DataSourceCustomFile extends DataSourceFile {
    save (id, data) {
      super.save(id, data)
    }

    list (options) {
      return super.list(options)
    }

    serialize () {
      return false
    }
  }

  return DataSourceCustomFile
}
