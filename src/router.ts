import { Router, Response, Request } from 'express';

export const router = Router();

router.get('/isalive', (req: Request, res: Response) => { res.send('alive'); });