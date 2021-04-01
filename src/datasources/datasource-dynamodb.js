import { DataSourceMemory } from "./datasource-memory";

/**
 * Datasource adapter for AWS Dynamo DB
 */
export class DataSourceDynamoDb extends DataSourceMemory {
  save(id, data) {
    super.save(id, data);
    console.log("dynamo db", id, data);
  }
}
