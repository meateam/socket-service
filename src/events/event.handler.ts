import { Socket } from '../socket';
import { config } from '../config';

export class EventHandler {
  /**
   * folders emits an event to the rooms if the field is not empty
   * @param folderIDs is an array of all the foldersId's
   * @param userIDs is an array of all the userId's
   */
  static folders(folders: string[], users: string[]): void {
    if (folders && folders.length) {
      Socket.emitRoom(folders, config.socket.namespaces.folder);
    }

    if (users && users.length) {
      Socket.emitRoom(users, config.socket.namespaces.shared);
    }
  }

  /**
   * configuration emits an event in case of configuration change
   */
  static configuration(): void {
    Socket.emitNamespace(config.socket.namespaces.confguratioin);
  }
}
