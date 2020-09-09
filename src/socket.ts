import * as express from 'express';
import * as socketIO from 'socket.io';
import * as socketIORedis from 'socket.io-redis';
import * as jwt from 'jsonwebtoken';
import * as http from 'http';
import { logger } from './utils/logger/logger';
import { config } from './config';
import { UnauthorizedError } from './utils/errors/application';
import { IMessage, OBJECTTYPE } from './message/message.interface';

export class Socket {
  static io: socketIO.Server;

  private app: express.Application;
  private server: http.Server;

  public static startSocket(): Socket {
    return new Socket();
  }

  private constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    Socket.io = socketIO(this.server);

    this.initalizeSocket();
  }

  /**
   * initalizeSocket connect to all the namespaces in the config
   */
  private initalizeSocket(): void {
    Socket.io.adapter(socketIORedis({ host: config.redis.host, port: config.redis.port as number }));
    Socket.io.use((socket, next) => {
      const token: string = socket.handshake.query.token;
      if (token) {
        jwt.verify(token, config.authorization.secret, (err) => {
          if (err) return next(new UnauthorizedError());
          next();
        });
      } else {
        next(new UnauthorizedError());
      }
    });
    Socket.io.origins(config.authorization.origin);
    this.connect();
  }

  private connect(): void {
    Socket.io.on('connect', (socket: SocketIO.Socket) => {
      logger.log(`Connected client ${socket.id}`);

      socket.on('joinRoom', (room: string) => {
        socket.join(room);
      });
    });
  }

  /**
   * emitRoom emits to all the rooms in the namespace the change event
   * @param rooms is the list of the rooms that needs to be emitted
   */
  static emitRooms(rooms: string[], eventName: OBJECTTYPE, data: Partial<IMessage>): void {
    rooms.forEach((room: string) => {
      Socket.io.to(room).emit(eventName, data);
    });
  }
}
