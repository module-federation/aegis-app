# Developing an application using MicroLib

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

Example of an Order and Customer service streaming to and running in the same [MicroLib](https://github.com/module-federation/MicroLib) host server process. Shows integration with, and orchestration of, an Address, Payment, Inventory, Shipping, Event (Kafka, WebSockets), and Persistance service (MongoDB) via MicroLib federated ports.d
