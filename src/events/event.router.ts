import { Router } from 'express';
import { EventController } from './event.controller';

const EventRouter: Router = Router();

EventRouter.post('/folders', EventController.folders);
EventRouter.post('/configuration', EventController.configuration);

export { EventRouter };
