const esHost: string = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';
const esUser: string = process.env.ELASTICSEARCH_USER || '';
const esPass: string = process.env.ELASTICSEARCH_PASSWORD || '';

export const config = {
  appPort: process.env.PORT || 8080,
  socket: {
    port: process.env.SOCKET_PORT || 3000
  },
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
  },
  rabbit: {
    connectionString: process.env.RABBIT_CONNECTION_STRING || 'amqp://localhost',
    queue: process.env.SOCKET_RABBIT_QUEUE || 'socket'
  },
  authorization: {
    secret: process.env.GW_SECRET || '',
    origin: process.env.GW_WEB_UI || 'localhost',
  },
  logger: {
    serviceName: 'socket-service',
    options: {
      hosts: esHost && esHost.split(','),
      httpAuth: `${esUser}:${esPass}`,
    },
    indexPrefix: process.env.LOG_INDEX || 'kdrive',
    debugMode: process.env.DEBUG_MODE === 'true',
    useElastic: process.env.ELASTICSEARCH_URL !== undefined,
  },
};
