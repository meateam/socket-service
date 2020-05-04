import { ConfigurationSocket } from '../sockets/socket.configuration';
import { FolderSocket } from '../sockets/socket.folder';
import { SharedFoldersSocket } from '../sockets/socket.shared';

export class EventHandler {
  static folder(folderId: string): void {
    FolderSocket.emit(folderId);
  }

  static shared(users: string[]): void {
    SharedFoldersSocket.emit(users);
  }

  static configuration(): void {
    ConfigurationSocket.emit();
  }
}
