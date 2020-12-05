import { Router } from 'express';
import {
	createLabel,
	deleteLabelById,
	getAllLabels,
	getAllTasksByLabelId,
	getLabelById,
	updateLabelById,
} from '../Controller/controller.label';

// eslint-disable-next-line new-cap
export const labelRouter = Router({ mergeParams: true });

/**
 * Folgend sind alle Routen aufgeführt, die ein Label hat
 */
labelRouter.post('/', createLabel);
labelRouter.delete('/:labelId', deleteLabelById);
labelRouter.get('/', getAllLabels);
labelRouter.get('/task/:labelId', getAllTasksByLabelId);
labelRouter.get('/:labelId', getLabelById);
labelRouter.patch('/:labelId', updateLabelById);
