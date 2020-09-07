import { IMessage } from './message.interface';
import { Socket } from '../socket';

export class MessageHandler {
  static emit(message: IMessage): void {
    const data: Partial<IMessage> = {
      fileID: message.fileID,
      folderID: message.folderID,
      operation: message.operation
    };

    Socket.emitRooms(message.userIDs, message.objectType, data);

  }
}
