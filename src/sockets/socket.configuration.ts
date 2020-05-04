import * as socketIo from 'socket.io';
import { logger } from '../utils/logger/logger';

export class ConfigurationSocket {
  static nsp: socketIo.Namespace;

  static connect(io: socketIo.Server): void {
    ConfigurationSocket.nsp = io.of('/configuration');
    ConfigurationSocket.nsp.on('connect', (socket: SocketIO.Socket) => {
      logger.log(`Connected client ${socket.id}`);

      socket.on('disconnect', async () => {
        logger.log(`Disconnect client ${socket.id}`);
      });
    });
  }

  static emit(): void {
    ConfigurationSocket.nsp.emit('configurationChange');
  }
}
