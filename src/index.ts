import * as socketRabbit from 'rabbit-socket.io';
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

(async () => {
  await socketRabbit.connect(config.rabbit.connectionString, config.port as number);
  await socketRabbit.listen(config.rabbit.queue, (content) => {

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
})();
