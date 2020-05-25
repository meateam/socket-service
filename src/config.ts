export const config = {
  server: {
    port: process.env.APPLICATION_PORT || 3000,
    name: 'socket-service',
  },
  redis: {
    port: process.env.REDIS_PORT || 6379,
    host: process.env.REDIS_HOST || 'localhost',
  },
  socket: {
    namespaces: {
      confguratioin: process.env.CONFIGURATION_NAMESPACE || '/configuration',
      shared: process.env.SHARED_FOLDERS_NAMESPACE || '/shared-page',
      folder: process.env.FOLDER_NAMESPACE || '/folder'
    },
    event: process.env.SOCKET_EVENT_NAME || 'refresh'
  },
  authorization: {
    secret: process.env.GW_SECRET || '',
    required: process.env.AUTH_REQUIRED || false,
  },
  cors: {
    socket: process.env.GW_WEB_UI || 'localhost',
    gw: process.env.GW_ALLOW_ORIGINS || 'localhost:8080'
  },
};
