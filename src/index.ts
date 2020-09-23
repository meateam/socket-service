import * as socketRabbit from 'rabbit-socket.io';
import * as http from 'http';
import express from 'express';
import { log, Severity } from './logger';
import { router } from './router';
import { config } from './config';

export interface IMessage {
  operation: Operation;
  objectType: ObjectType;
  fileID: string;
  folderID: string;
  userIDs: string[];
}

export enum ObjectType {
  FILE = 'FILE',
  PERMISSION = 'PERMISSION',
}

enum Operation {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

/**
 * startServer create a new server and listen to the recived port.
 * @param port is the express app port
 */
const startServer = async (port: number) => {
  const app: express.Application = express();
  app.use(router);

  http.createServer(app).listen(port, () => {
    log(Severity.INFO, `Express server listening on port ${port}`, 'initApp');
  });
};

/**
 * connectRabbitSocket is connecting to rabbit with the connection string and the port of the socket
 */
const connectRabbitSocket = async () => {
  try {
    await socketRabbit.connect(
      config.rabbit.connectionString,
      config.socket.port as number,
      {
        useRedisAdapter: true,
        redisHost: config.redis.host,
        redisPort: config.redis.port as number,
      }
    );
  } catch (err) {
    log(Severity.ERROR, `error while connecting to socketRabbit : ${err}`, 'socketRabbit.connect');
    return;
  }

};

/***
 * listenToQueue is listens to the queue, and formats all the recived messages to the require type.
 */
const listenToQueue = async () => {
  try {
    await socketRabbit.listen(config.rabbit.queue, (content: any) => {
      const message = JSON.parse(content);

      const data: { fileID: string; folderID: string } = {
        fileID: message.fileID,
        folderID: message.folderID,
      };
      const rooms: string[] = message.userIDs;
      const event: string = `${message.objectType}_${message.operation}`;

      const msg: socketRabbit.Message = {
        data,
        rooms,
        event,
      };

      return msg;
    });
  } catch (err) {
    log(Severity.ERROR, `error while listenning to the queue : ${err}`, 'socketRabbit.listen');
    return;
  }
};

(async () => {
  await startServer(config.appPort as number);

  await connectRabbitSocket();
  await listenToQueue();
})();
