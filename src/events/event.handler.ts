import { RefresSocket } from '../sockets/socket.refres';
import { config } from '../config';

export class EventHandler {
  static folders(folderIDs: string[], userIDs: string[]): void {
    if (folderIDs.length) {
      RefresSocket.emitRoom(folderIDs, config.socket.namespaces.folder);
    }

    if (userIDs.length) {
      RefresSocket.emitRoom(userIDs, config.socket.namespaces.shared);
    }
  }

  static configuration(): void {
    RefresSocket.emit(config.socket.namespaces.confguratioin);
  }
}
