import { Router } from 'express';
import { EventRouter } from './events/event.router';

const AppRouter: Router = Router();

AppRouter.use('/api/socket', EventRouter);

AppRouter.use('/healthCheck', (req, res) => {
  res.status(200).send('alive');
});

AppRouter.use('*', (req, res) => {
  res.status(404).send('Invalid Route');
});

export { AppRouter };
