import {Router} from 'express';
import {
  addLabelsByTaskId,
  createTask,
  deleteLabelsByTaskId,
  deleteTaskById,
  getAllTasks,
  getAllTrackingsByTaskId,
  getTaskById,
  getAllLabesByTaskId,
  updateTaskById,
  sendSlackByTaskId,
  sendSlackAll,
} from '../Controller/controller.task';

// eslint-disable-next-line new-cap
export const taskRouter = Router({mergeParams: true});

/**
 * Folgend sind alle Routen aufgeführt, die ein Task hat
 */
taskRouter.post('/label/:taskId', addLabelsByTaskId);
taskRouter.post('/', createTask);
taskRouter.delete('/label/:taskId', deleteLabelsByTaskId);
taskRouter.delete('/:taskId', deleteTaskById);
taskRouter.get('/label/:taskId', getAllLabesByTaskId);
taskRouter.get('/', getAllTasks);
taskRouter.get('/tracking/:taskId', getAllTrackingsByTaskId);
taskRouter.get('/:taskId', getTaskById);
taskRouter.post('/slack', sendSlackAll);
taskRouter.post('/slack/:taskId', sendSlackByTaskId);
taskRouter.patch('/:taskId', updateTaskById);


