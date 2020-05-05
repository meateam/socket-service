import { Request, Response } from 'express';
import { EventHandler } from './event.handler';

export class EventController {
  static folders(req: Request, res: Response): void {
    res.json(EventHandler.folders(req.body.folders, req.body.users));
  }

  static configuration(req: Request, res: Response): void {
    res.json(EventHandler.configuration());
  }
}
