# Developing an Aegis federated application

Getting Started

[Click here to use this project as a tempate](https://github.com/module-federation/microlib-examples/generate). Fill out the form. A new repo is created. Clone it and start coding!

```shell
git clone https://github.com/module-federation/<your repo name>
cd <your repo name>
cp dotenv.example .env
yarn
yarn build
```

See the [article](https://trmidboe.medium.com/discounting-the-microservice-premium-a95311c61367) that describes these concepts in detail.

This repo contains an example of an Order, User Customer and Inventory service streaming to and running in the same [MicroLib](https://github.com/module-federation/MicroLib) host server process. (Other builds area available where the services run remotely.) The examples demonstrate integration with, and orchestration of, an Address, Payment, Inventory, Shipping, Event (Kafka), and Persistance service (MongoDB) via MicroLib federated ports.

Feel free to delete the examples and start fresh.
