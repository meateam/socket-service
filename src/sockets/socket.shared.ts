import * as socketIo from 'socket.io';
import { logger } from '../utils/logger/logger';

export class SharedFoldersSocket {
  static nsp: socketIo.Namespace;

  static connect(io: socketIo.Server): void {
    SharedFoldersSocket.nsp = io.of('/shared-folders');
    SharedFoldersSocket.nsp.on('connect', (socket: SocketIO.Socket) => {
      logger.log(`Connected client ${socket.id}`);

      socket.on('connectUser', (userId: string) => {
        socket.join(userId);
      });

      socket.on('disconnect', async () => {
        logger.log(`Disconnect client ${socket.id}`);
      });
    });
  }

  static emit(users: string[]): void {
    users.forEach((user) => {
      SharedFoldersSocket.nsp.in(user).emit('shardFoldersChange');
    });
  }
}
