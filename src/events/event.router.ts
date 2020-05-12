import { Router } from 'express';
import { EventController } from './event.controller';

const EventRouter: Router = Router();

EventRouter.post('/shared', EventController.shared);
EventRouter.post('/configuration', EventController.configuration);

export { EventRouter };
