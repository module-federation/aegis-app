'use strict'

import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'fedmon',
  brokers: ['localhost:9092']
})

let groupId = process.env.KAFKA_GROUP_ID;
const consumer = kafka.consumer({ groupId });
const producer = kafka.producer();

export const Event = {

  listening: false,

  /**
   * 
   * @param {string|RegExp} topic 
   * @param {function({message, topic})} callback 
   */
  async listen(topic, callback) {
    try {
      await consumer.connect();
      await consumer.subscribe({ topic: topic, fromBeginning: true });
      this.listening = true;
      await consumer.run({
        eachMessage: async ({ topic, message }) => callback({
          topic, message: message.value.toString()
        })
      });
    } catch (e) {
      throw e;
    }
  },

  async notify(topic, message) {
    await producer.connect()
    await producer.send({
      topic: topic,
      messages: [
        { value: message },
      ],
    });
    await producer.disconnect();
  }
}








