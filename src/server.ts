import * as express from 'express';
import * as socketIo from 'socket.io';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import { config } from './config';
import { AppRouter } from './router';
import { userErrorHandler, serverErrorHandler, unknownErrorHandler } from './utils/errors/handler';
import { logger } from './utils/logger/logger';
import { RefreshSocket } from './sockets/socket.refresh';

export class Server {
  public app: express.Application;
  private server: http.Server;
  private io: socketIo.Server;

  public static startServer(): Server {
    return new Server();
  }

  private constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketIo(this.server);
    this.configurationMiddleware();
    this.app.use(AppRouter);
    this.initializeErrorHandler();

    this.server.listen(config.server.port, () => {
      logger.log(`${config.server.name} listening on port ${config.server.port}`);
    });
    this.connectSockets();
  }

  private connectSockets() {
    Object.values(config.socket.namespaces).forEach((namespace: string) => {
      RefreshSocket.connect(this.io.of(namespace));
    });
  }

  private setHeaders = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type');
    next();
  }

  private configurationMiddleware() {
    this.app.use(this.setHeaders);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private initializeErrorHandler() {
    this.app.use(userErrorHandler);
    this.app.use(serverErrorHandler);
    this.app.use(unknownErrorHandler);
  }
}
