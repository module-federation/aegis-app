# Developing an application using MicroLib

See the [article](https://trmidboe.medium.com/discounting-the-microservice-premium-a95311c61367) that describes these concepts in detail.

Example of an Order and Customer service streaming to and running in the same [MicroLib](https://github.com/module-federation/MicroLib) host server process. Shows integration with, and orchestration of, an Address, Payment, Inventory, Shipping, Event (Kafka, WebSockets), and Persistance service (MongoDB) via MicroLib federated ports.
