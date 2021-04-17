"use strict";

/**
 * Datasource adapter factory.
 * @name DataSourceAdapterMongo
 * @param {string} url database url
 * @param {*} DataSource base class that enables caching
 * @param {number} [cacheSize] number of models to keep in cache
 * @returns {import("./datasource").default}
 */
export const DataSourceAdapterMongo = function (
  url,
  cacheSize,
  DataSourceMongoDb
) {
  /**
   * MongoDB adapter extends in-memory datasource to support caching.
   * The cache is always updated first, which allows the system to run
   * even when the database is offline.
   */
  class DataSourceMongoDbCustom extends DataSourceMongoDb {
    constructor(datasource, factory, name) {
      super(datasource, factory, name);
      this.url = url;
      this.cacheSize = cacheSize;
    }
  }

  return DataSourceMongoDbCustom;
};
