# Developing a federated application with ÆGIS

Getting Started

Click [here](https://github.com/module-federation/microlib-examples/generate)  to use this project as a tempate. Fill out the form. A new repo is created. Clone it and start coding!

```shell
git clone https://github.com/module-federation/<your repo name>
cd <your repo name>
cp dotenv.example .env
yarn
yarn build
```

Otherwise, fork this repo and 

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/github.com/module-federation/aegis-app) 


See the [article](https://trmidboe.medium.com/discounting-the-microservice-premium-a95311c61367) that describes these concepts in detail.

This template repo provides the scaffolding to build a federated application on ÆGIS. It contains an example of an Order, User, Customer and Inventory service streaming to and running in the same [ÆGIS](https://github.com/module-federation/MicroLib) host server process. (Other builds area available where the services run remotely.) The repo also includes a test server for running the examples (and the required middleware).  The examples demonstrate integration with, and orchestration of, an Address, Payment, Inventory, Shipping, Event (Kafka), and Persistance service (MongoDB) using federated ports.

Feel free to delete the examples and start fresh.
