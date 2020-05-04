import { Socket } from '../socket';
import { config } from '../config';

export class EventHandler {
  /**
   * folders emits an event to the rooms if the field is not empty
   * @param folderIDs is an array of all the foldersId's
   * @param userIDs is an array of all the userId's
   */
  static folders(folderIDs: string[], userIDs: string[]): void {
    if (folderIDs.length) {
      Socket.emitRoom(folderIDs, config.socket.namespaces.folder);
    }

    if (userIDs.length) {
      Socket.emitRoom(userIDs, config.socket.namespaces.shared);
    }
  }

  /**
   * configuration emits an event in case of configuration change
   */
  static configuration(): void {
    Socket.emitNamespace(config.socket.namespaces.confguratioin);
  }
}
