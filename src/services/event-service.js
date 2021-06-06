"use strict";

import { Kafka } from "kafkajs";

const brokers = process.env.KAFKA_BROKERS || "localhost:9092";
const topics = new RegExp(process.env.KAFKA_TOPICS) || /Channel/;
const groupId = (process.env.KAFKA_GROUP_ID || "MicroLib") + process.pid;

const kafka = new Kafka({
  clientId: "MicroLib",
  brokers: brokers.split(","),
});

const consumer = kafka.consumer({ groupId });
const producer = kafka.producer();

/**
 * @typedef {EventService}
 */
export const Event = {
  listening: false,
  topics,

  /**
   * Implements event consumer service.
   * @param {string|RegExp} topic
   * @param {function({message, topic})} callback
   */
  async listen(topic, callback) {
    try {
      await consumer.connect();
      await consumer.subscribe({ topic, fromBeginning: true });
      this.listening = true;
      await consumer.run({
        eachMessage: async ({ topic, message }) => {
          try {
            callback({
              topic,
              message: message.value.toString(),
            });
          } catch (error) {
            console.error(error);
          }
        },
      });
    } catch (error) {
      console.error(error);
    }
  },

  /**
   * Implemements event producer service.
   * @param {string|RegExp} topic
   * @param {string} message
   */
  async notify(topic, message) {
    try {
      await producer.connect();
      await producer.send({
        topic: topic,
        messages: [{ value: message }],
      });
      await producer.disconnect();
    } catch (error) {
      console.error({ func: this.notify.name, error });
    }
  },
};
