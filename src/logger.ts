import * as winston from 'winston';
import * as elasticsearch from 'winston-elasticsearch';
import * as os from 'os';
import { config } from './config';

const indexTemplateMapping = require('winston-elasticsearch/index-template-mapping.json');
indexTemplateMapping.index_patterns = `${config.logger.indexPrefix}-*`;

export const logger: winston.Logger = winston.createLogger({
  defaultMeta: { service: config.logger.serviceName, hostname: os.hostname() },
});

// configure logger
if (config.logger.useElastic) {
  const es = new elasticsearch.default({
    indexPrefix: config.logger.indexPrefix,
    level: 'verbose',
    clientOpts: config.logger.options,
    bufferLimit: 100,
    messageType: 'log',
    ensureMappingTemplate: true,
    mappingTemplate: indexTemplateMapping,
  });
  logger.add(es);
}

if (config.logger.debugMode) {
  const consoleLogger = new winston.transports.Console();
  logger.add(consoleLogger);
}

/**
 * logs the data with its given parameters.
 * @param severity - the kind of log created.
 * @param name - name of the log. in our case, the function called.
 * @param description - description in text.
 * @param traceID - id to correlate to if there are several logs with some connection.
 * @param user - the user requesting for the service.
 * @param meta - additional optional information.
 */
export const log = (level: Severity, message: string, name: string, traceID?: string, meta?: object) => {
  logger.log(level, message, { ...meta, traceID, method: name });
};

export enum Severity {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  VERBOSE = 'verbose',
  DEBUG = 'debug',
  SILLY = 'silly',
}
