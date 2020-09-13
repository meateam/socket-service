import * as socketRabbit from 'socket-rabbit';
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
    DELETE= 'DELETE',
}

(async () => {
  await socketRabbit.connect(config.rabbit.connectionString, config.rabbit.queue);
  await socketRabbit.listen(config.rabbit.queue, (content) => {
    const message = JSON.parse(content);

    const data = { fileID: message.fileID, operation: message.operation, folderID: message.folderID };
    const rooms = message.userIDs;
    const event = message.objectType;

    const msg = {
      data,
      rooms,
      event
    };

    return msg;
  });
})();
