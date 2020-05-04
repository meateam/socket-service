import { Request, Response } from 'express';
import { EventHandler } from './event.handler';

export class EventController {
  static folder(req: Request, res: Response): void {
    res.json(EventHandler.folder(req.body.folderId));
  }

  static shared(req: Request, res: Response): void {
    res.json(EventHandler.shared(req.body.users));
  }

  static configuration(req: Request, res: Response): void {
    res.json(EventHandler.configuration());
  }
}
