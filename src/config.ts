export const config = {
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
};
