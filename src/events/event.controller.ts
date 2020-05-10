import { Request, Response } from 'express';
import { EventHandler } from './event.handler';

export class EventController {
  static shared(req: Request, res: Response): void {
    res.json(EventHandler.shared(req.body.folderIDs, req.body.userIDs));
  }

  static configuration(req: Request, res: Response): void {
    res.json(EventHandler.configuration());
  }
}
