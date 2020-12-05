import { Router } from 'express';
import {
	createTracking,
	deleteTrackingById,
	getAllTrackings,
	getTrackingById,
	updateTrackingById,
} from '../Controller/controller.tracking';

// eslint-disable-next-line new-cap
export const trackingRouter = Router({ mergeParams: true });

/**
 * Folgend sind alle Routen aufgeführt, die ein tracing hat
 */
trackingRouter.post('/', createTracking);
trackingRouter.delete('/:trackingId', deleteTrackingById);
trackingRouter.get('/', getAllTrackings);
trackingRouter.get('/:trackingId', getTrackingById);
trackingRouter.patch('/:trackingId', updateTrackingById);
