
# Developing an application using MicroLib

Example of an Order and Customer service streaming to and running in the same [MicroLib](https://github.com/module-federation/MicroLib) host server process. Shows integration with, and orchestration of, an Address, Payment, Inventory, Shipping, Event (Kafka, WebSockets), and Persistance service (MongoDB) via MicroLib federated ports.

# Running the Remote Example
1) `yarn install`
2) Create an .env file with the following

```
#.env
CLUSTER_ENABLED=true
AUTH_ENABLED=false
SSL_ENABLED=false
SSL_PORT=8070
PORT=8707
API_ROOT=/microlib/api
KAFKA_GROUP_ID=microlib-host
ENCRYPTION_PWD=aegis
DATASOURCE_ADAPTER=DataSourceFile
MONGODB_URL=mongodb://localhost:27017
CACHE_SIZE=300
```
3) `yarn start`
4) Clone and run https://github.com/module-federation/MicroLib
6) Navigate to http://localhost:8707/