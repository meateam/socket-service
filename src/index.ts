import * as socketRabbit from "rabbit-socket.io";
import * as http from "http";
import express from "express";
import { router } from "./router";
import { config } from "./config";

export interface IMessage {
  operation: operation;
  objectType: objectType;
  fileID: string;
  folderID: string;
  userIDs: string[];
}

export enum objectType {
  FILE = "FILE",
  PERMISSION = "PERMISSION",
}

enum operation {
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
}

/**
 * startServer create a new server and listen to the recived port.
 * @param port is the express app port
 */
const startServer = async (port: number) => {
  const app: express.Application = express();
  app.use(router);

  http.createServer(app).listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
};

/**
 * connectRabbitSocket is connecting to rabbit with the connection string and the port of the socket
 */
const connectRabbitSocket = async () => {
  await socketRabbit.connect(
    config.rabbit.connectionString,
    config.socket.port as number,
    {
      useRedisAdapter: true,
      redisHost: config.redis.host,
      redisPort: config.redis.port as number,
    }
  );
};

/***
 * listenToQueue is listens to the queue, and formats all the recived messages to the require type.
 */
const listenToQueue = async () => {
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
};

(async () => {
  await startServer(config.appPort as number);
  await connectRabbitSocket();
  await listenToQueue();
})();
