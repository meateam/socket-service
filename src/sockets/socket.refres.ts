import * as socketIo from 'socket.io';
import { logger } from '../utils/logger/logger';

export class RefresSocket {
  static nsp: socketIo.Namespace;

  static connect(nsp: socketIo.Namespace): void {
    RefresSocket.nsp = nsp;
    RefresSocket.nsp.on('connect', (socket: SocketIO.Socket) => {
      logger.log(`Connected client ${socket.id}`);

      socket.on('joinRoom', (room: string) => {
        socket.join(room);
      });

      socket.on('disconnect', async () => {
        logger.log(`Disconnect client ${socket.id}`);
      });
    });
  }

  static emitRoom(arr: string[], event: string): void {
    arr.forEach((room) => {
      RefresSocket.nsp.in(room).emit(event);
    });
  }

  static emit(event: string): void {
    RefresSocket.nsp.emit(event);
  }
}
