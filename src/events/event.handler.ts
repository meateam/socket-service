import { ConfigurationSocket } from '../sockets/configuration.socket';
import { FolderSocket } from '../sockets/folder.socket';
import { SharedFoldersSocket } from '../sockets/shared.socket';

export class EventHandler {
    static folder(folderId: string) {
        FolderSocket.emit(folderId);
    }

    static shared(users: string[]) {
        SharedFoldersSocket.emit(users);
    }

    static configuration() {
        ConfigurationSocket.emit();
    }
} 