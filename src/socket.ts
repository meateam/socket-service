import * as socketIo from 'socket.io';
import { logger } from './utils/logger/logger';
import { config } from './config';

export class SocketsConnector {
  static io: socketIo.Server;

  /**
   * startSocket connect to all the namespaces in the config
   * @param io is the socketio server
   */
  static startSocket(io: socketIo.Server): void {
    SocketsConnector.io = io;
    Object.values(config.socket.namespaces).forEach((namespace: string) => {
      SocketsConnector.connect(this.io.of(namespace));
    });
  }

  /**
   * connect gets a namespace and creates an event listener for the socket
   * @param nsp is the socket namespace
   */
  static connect(nsp: socketIo.Namespace): void {
    nsp.on('connect', (socket: SocketIO.Socket) => {
      logger.log(`Connected client ${socket.id}`);

      socket.on('joinRoom', (room: string) => {
        console.log(room);
        socket.join(room);
      });
    });
  }

  /**
   * emitRoom emits to all the rooms in the namespace the change event
   * @param rooms is the list of the rooms that needs to be emitted
   * @param nsp is the socket namespace
   */
  static emitRoom(rooms: string[], nsp: string): void {
    rooms.forEach((room: string) => {
      SocketsConnector.io.of(nsp).to(room).emit(config.socket.event);
    });
  }

  /**
   * emitNamespace emits to all the sockets that connected the change event
   * @param nsp is the socket namespace
   */
  static emitNamespace(nsp: string): void {
    SocketsConnector.io.of(nsp).emit(config.socket.event);
  }
}
