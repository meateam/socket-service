import { Severity } from './severity';

export const logger = {
  log: (message: string, severityLevel: Severity = Severity.Informational) => {
    console.log(`[${severityLevel}]: ${message}`);
  },
};
