export const config = {
  server: {
    port: process.env.APPLICATION_PORT || 3000,
    name: 'socket-service',
  },
  socket: {
    namespaces: {
      confguratioin: process.env.CONFIGURATION_NAMESPACE || '/configuration',
      shared: process.env.SHARED_FOLDERS_NAMESPACE || '/shared-folders',
      folder: process.env.FOLDER_NAMESPACE || '/folder'
    }
  }
};
