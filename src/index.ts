import { Socket } from './socket';
import { RabbitHandler } from './utils/rabbitConnector';

(async () => {
  Socket.startSocket();
  await RabbitHandler.initalizeRabbit();
})();
