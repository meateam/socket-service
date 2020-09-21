import * as socketRabbit from 'rabbit-socket.io';
import * as http from 'http';
import express from 'express';
import { router } from './router';
import { config } from './config';

export interface IMessage {
  operation: OPERATION;
  objectType: OBJECTTYPE;
  fileID: string;
  folderID: string;
  userIDs: string[];
}

export enum OBJECTTYPE {
  FILE = 'FILE',
  PERMISSION = 'PERMISSION'
}

enum OPERATION {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

const startServer = async () => {
  const app: express.Application = express();
  app.use(router);

  http.createServer(app).listen(config.port, () => {
    console.log(`Express server listening on port ${config.port}`);
  });
}

const connectRabbitSocket = async () => {
  await socketRabbit.connect(config.rabbit.connectionString, config.socket.port as number);
}

const listenToQueue = async () => {
  await socketRabbit.listen(config.rabbit.queue, (content: any) => {

    const message = JSON.parse(content);

    const data = { fileID: message.fileID, folderID: message.folderID };
    const rooms = message.userIDs;
    const event = `${message.objectType}_${message.operation}`;

    const msg = {
      data,
      rooms,
      event
    };

    return msg;
  });
}

(async () => {
  await connectRabbitSocket();
  await listenToQueue();
})();
