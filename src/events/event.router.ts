import { Router } from 'express';
import { EventController } from './event.controller';
// import { wrapAsync } from '../utils/wrapper';

const EventRouter: Router = Router();

EventRouter.post('/folder', EventController.folder);
EventRouter.post('/configuration', EventController.configuration);
EventRouter.post('/shared', EventController.shared);

export { EventRouter };
