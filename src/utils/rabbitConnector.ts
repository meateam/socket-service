import menash, { ConsumerMessage } from 'menashmq';
import { config } from '../config';
import { IMessage } from '../message/message.interface';
import { MessageHandler } from '../message/message.handler';

export class RabbitHandler {
  static async initalizeRabbit(): Promise<void> {
    await menash.connect(config.rabbit.connectionString);
    await menash.declareQueue(config.rabbit.queue);
    await RabbitHandler.listen(config.rabbit.queue);
  }

  static async listen(queue: string) {
    await menash.queue(queue).activateConsumer((msg: ConsumerMessage) => {
      const message = msg.getContent() as IMessage;
      MessageHandler.emit(message);
      msg.ack();
    });
  }
}
