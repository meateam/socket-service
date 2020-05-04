import * as socketIo from 'socket.io';
import { logger } from '../utils/logger/logger';

export class RefreshSocket {
  static io: socketIo.Server;

  static createSocket(io: socketIo.Server): void {
    RefreshSocket.io = io;
  }

  static connect(nsp: socketIo.Namespace): void {
    nsp.on('connect', (socket: SocketIO.Socket) => {
      logger.log(`Connected client ${socket.id}`);

      socket.on('joinRoom', (room: string) => {
        socket.join(room);
      });

      socket.on('disconnect', async () => {
        logger.log(`Disconnect client ${socket.id}`);
      });
    });
  }

  static getNamespace(name: string) {
    return RefreshSocket.io.of(name);
  }

  static getEventName(name: string) {
    return name.replace('/', '');
  }

  static emitRoom(arr: string[], nsp: string): void {
    arr.forEach((room) => {
      RefreshSocket.getNamespace(nsp).in(room).emit(RefreshSocket.getEventName(nsp));
    });
  }

  static emit(nsp: string): void {
    RefreshSocket.getNamespace(nsp).emit(RefreshSocket.getEventName(nsp));
  }
}
