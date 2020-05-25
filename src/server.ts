import * as express from 'express';
import * as socketIo from 'socket.io';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import { config } from './config';
import { AppRouter } from './router';
import { userErrorHandler, serverErrorHandler, unknownErrorHandler } from './utils/errors/handler';
import { logger } from './utils/logger/logger';
import { SocketsConnector } from './socket';
import { Authenticator } from './utils/authenticator';

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
    SocketsConnector.startSocket(this.io);

    this.configurationMiddleware();
    this.app.use(AppRouter);
    this.initializeErrorHandler();

    this.server.listen(config.server.port, () => {
      logger.log(`${config.server.name} listening on port ${config.server.port}`);
    });
  }

  private configurationMiddleware() {
    this.app.use(this.setHeaders);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    if (config.authorization.required) {
      this.app.use(Authenticator.initialize());
      this.app.use(Authenticator.middleware);
    }
  }

  /**
 * setHeaders set the response Access-Control-Allow headers
 */
  private setHeaders = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const origin = req.headers.origin as string;

    if (config.cors.gw === origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type');

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    return next();

  }

  private initializeErrorHandler() {
    this.app.use(userErrorHandler);
    this.app.use(serverErrorHandler);
    this.app.use(unknownErrorHandler);
  }
}
