
# Developing an application using MicroLib

Example of an Order and Customer service coexisting in the same MF host process. Includes integration with, and orchestration of, an Address, Payment, Inventory and Shipping service using Kafka, WebSockets, and MongoDB.



The [MicroLib](https://github.com/tysonrm/microlib) server remotely imports modules in src/services, src/adapters and src/models. Code to retrieve chunks via http (instead of shared filesystem) courtesy of [jacob-ebey](https://github.com/jacob-ebey)
