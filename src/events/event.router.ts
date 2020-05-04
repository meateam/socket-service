import { Router } from 'express';
import { EventController } from './event.controller';

const EventRouter: Router = Router();

EventRouter.post('/folder', EventController.folder);
EventRouter.post('/configuration', EventController.configuration);
EventRouter.post('/shared', EventController.shared);

export { EventRouter };
