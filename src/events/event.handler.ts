import { RefreshSocket } from '../sockets/socket.refresh';
import { config } from '../config';

export class EventHandler {
  static folders(folderIDs: string[], userIDs: string[]): void {
    if (folderIDs.length) {
      RefreshSocket.emitRoom(folderIDs, config.socket.namespaces.folder);
    }

    if (userIDs.length) {
      RefreshSocket.emitRoom(userIDs, config.socket.namespaces.shared);
    }
  }

  static configuration(): void {
    RefreshSocket.emit(config.socket.namespaces.confguratioin);
  }
}
