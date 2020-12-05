import { Router, Request, Response } from 'express';
import { labelRouter } from './router.label';
import { taskRouter } from './router.task';
import { trackingRouter } from './router.tracking';

// eslint-disable-next-line new-cap
export const globalRouter = Router({ mergeParams: true });

globalRouter.get('/', async (_: Request, res: Response) => {
	res.send({ message: 'Hello api' });
});

globalRouter.use('/task', taskRouter);
globalRouter.use('/label', labelRouter);
globalRouter.use('/tracking', trackingRouter);
