import * as socketIo from 'socket.io';
import { logger } from '../utils/logger/logger';

export class FolderSocket {
  static nsp: socketIo.Namespace;

  static connect(io: socketIo.Server): void {
    FolderSocket.nsp = io.of('/folder');
    FolderSocket.nsp.on('connect', (socket: SocketIO.Socket) => {
      logger.log(`Connected client ${socket.id}`);

      socket.on('joinRoom', (room: string) => {
        socket.join(room);
      });

      socket.on('disconnect', async () => {
        logger.log(`Disconnect client ${socket.id}`);
      });
    });
  }

  static emit(room: string): void {
    FolderSocket.nsp.in(room).emit('folderChange');
  }
}
