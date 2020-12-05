import { getRepository } from 'typeorm';
import { Label } from '../Entities/Label';
import { Task } from '../Entities/Task';
import Axios from 'axios';

/**
 * Fügt ein Task eine Label zu.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body eine labelList.
 * Diese beinhaltet eine Liste mit Ids von Labels.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const addLabelsByTaskId = async (req, res) => {
	const taskId = req.params.taskId;
	const { labelList } = req.body;

	if (!taskId || !labelList) {
		res.status(400).send({
			error: 'Error: Parameter fehlt!',
		});
		return;
	}
	addLabels(taskId, labelList, res);
};

/**
 * Erstellt einen Task. Wird nur aus addlabelsByTaskId aufgerufen.
 * @param {number}taskId Id eines Task
 * @param {list}labelList Liste mit Label id
 * @param {Response}res Response
 */
async function addLabels(taskId, labelList, res) {
	type NewType = number;
	const taskRepo = getRepository(Task);
	try {
		const task = await taskRepo.findOneOrFail(taskId, { relations: ['labels'] });
		const taskLabelsList = task.labels;
		const labelRepo = getRepository(Label);

		for (let i = 0; i < Object.keys(labelList).length; ++i) {
			const labelId: NewType = labelList[i];
			const found = await labelRepo.findOne(labelId);
			if (found === undefined) {
				continue;
			}
			const label = await labelRepo.findOneOrFail(labelId);
			taskLabelsList.push(label);
			await taskRepo.save(task);
		}
		res.status(200).send({
			data: task,
		});
	} catch (error) {
		res.status(404).send({
			status: 'Error: ' + error,
		});
	}
}

/**
 * Erstellt einen Task.
 * Erwartet als Parameter nichts.
 * Erwartet im Body einen name und eine description.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const createTask = async (req, res) => {
	const { name, description } = req.body;

	if (!name || !description) {
		res.status(400).send({
			status: 'Error: Parameter fehlt!',
		});
		return;
	}
	const task = new Task();
	task.name = name;
	task.description = description;

	const taskRepository = getRepository(Task);
	const createdTask = await taskRepository.save(task);

	res.status(200).send({
		data: createdTask,
	});
};

/**
 * Löscht aus einem Task Labels heraus. Task wird mit seiner Id selektiert.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body eine labelList.
 * Diese beinhaltet eine Liste mit Ids von Labels.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const deleteLabelsByTaskId = async (req, res) => {
	const taskId = req.params.taskId;
	const { labelList } = req.body;

	if (checkIfAllParamsSet(taskId, labelList)) {
		res.status(400).send({
			status: 'Error: Parameter fehlt!',
		});
		return;
	}

	try {
		const taskRepo = getRepository(Task);
		const task = await taskRepo.findOneOrFail(taskId, { relations: ['labels'] });
		const taskLabelsList = task.labels;

		for (let i = 0; i < Object.keys(labelList).length; ++i) {
			for (let j = 0; j < taskLabelsList.length; ++j) {
				if (labelList[i] == taskLabelsList[j].id) {
					taskLabelsList.splice(j, 1);
				}
			}
		}
		task.labels = taskLabelsList;

		await taskRepo.save(task);
		res.status(200).send({
			data: task,
		});
	} catch (error) {
		res.status(404).send({
			status: 'Error: ' + error,
		});
	}
};

/**
 * Prüft, ob alle Parameter gesetzt werden für deleteLabelsByTaskId
 * @param {any}taskId Id von einer Task
 * @param {any}labelList Liste mit Ids von Labels.
 * @return {boolean} True, wenn alle Parameter gesetzt wurden
 */
function checkIfAllParamsSet(taskId: any, labelList: any) {
	return !taskId || !labelList;
}

/**
 * Löscht einen Task. Task wird mit seiner Id selektiert.
 * Löscht auch seine dazugehörigen Trackings mit.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const deleteTaskById = async (req, res) => {
	const taskId = req.params.taskId;
	const taskRepo = getRepository(Task);

	try {
		const task = await taskRepo.findOneOrFail(taskId);
		await taskRepo.remove(task);
		res.status(200).send({});
	} catch (error) {
		res.status(404).send({
			status: 'Error: ' + error,
		});
	}
};

/**
 * Gibt alle Labels eines Task wieder. Task wird anhand seiner Id selektiert.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const getAllLabesByTaskId = async (req, res) => {
	const taskId = req.params.taskId;
	const taskRepo = getRepository(Task);
	try {
		const task = await taskRepo.findOneOrFail(taskId, { relations: ['labels'] });
		const taskLabelsList = task.labels;
		res.status(200).send({ data: taskLabelsList });
	} catch (error) {
		res.status(404).send({
			status: 'Error: ' + error,
		});
	}
};

/**
 * Gibt alle Task zurück.
 * Erwartet als Parameter nichts.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const getAllTasks = async (req, res) => {
	const taskRepository = getRepository(Task);
	const tasks = await taskRepository.find({ relations: ['trackings', 'labels'] });

	const { filterTask, filterDescription, filterLabel } = req.query;
	let result = [...tasks];

	if (filterTask) {
		result = result.filter((r) => r.name === filterTask);
	}
	if (filterLabel) {
		result = result.filter((t) => t.labels.some((l) => l.name === filterLabel));
	}
	if (filterDescription) {
		result = result.filter((d) => d.description === filterDescription);
	}
	result.sort((a, b) => (a.name < b.name ? -1 : 1));
	res.status(200).send({ data: result });
};

/**
 * Gibt alle Trackings eines Task wieder. Task wird anhand seiner Id selektiert.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const getAllTrackingsByTaskId = async (req, res) => {
	const taskId = req.params.taskId;
	const taskRepo = getRepository(Task);
	try {
		const task = await taskRepo.findOneOrFail(taskId, {
			relations: ['trackings'],
		});
		const taskTrackingsList = await task.trackings;
		res.status(200).send({ data: taskTrackingsList });
	} catch (error) {
		res.status(404).send({
			status: 'Error: ' + error,
		});
	}
};

/**
 * Gibt einen Task anhand seiner Id zurück.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const getTaskById = async (req, res) => {
	const taskId = req.params.taskId;
	const taskRepository = getRepository(Task);

	try {
		const task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });
		res.status(200).send({
			data: task,
		});
	} catch (error) {
		res.status(404).send({
			status: 'Error: ' + error,
		});
	}
};

/**
 * Sendet alle Task an Slack Channel.
 * Erwartet als Parameter nichts.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const sendSlackAll = async (req, res) => {
	const taskRepository = getRepository(Task);

	const task = await taskRepository.find({ relations: ['trackings', 'labels'] });
	let allTasks: string = ``;
	for (let i = 0; i < task.length; ++i) {
		allTasks += ` Task Id: ${task[i].id}:
       Name:         ${task[i].name} 
       Beschr:       ${task[i].description}
       Erzeugt:      ${task[i].created}
       Update:       ${task[i].updated}
      \n`;
	}
	if (task.length === 0) {
		await Axios.post(`https://hooks.slack.com/services/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`, {
			text: `!!! Keine Task in der Datenbank !!!`,
		});
		res.status(200).send({
			data: `!!! Keine Task in der Datenbank !!!`,
		});
		return;
	} else {
		await Axios.post(`https://hooks.slack.com/services/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`, {
			text: `Tasks: \n${allTasks}`,
		});
		res.status(200).send({
			data: task,
		});
	}
};

/**
 * Sendet einen Task an Slack Channel. Task wird anhand seiner Id selektiert.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body nichts.
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const sendSlackByTaskId = async (req, res) => {
	const taskId = req.params.taskId;
	const taskRepository = getRepository(Task);

	try {
		const task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });
		await Axios.post(`https://hooks.slack.com/services/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`, {
			text: `Task ${task.id}:
             Name:         ${task.name} 
             Beschr:       ${task.description}
             Erzeugt:      ${task.created}
             Update:       ${task.updated}
             `,
		});
		res.status(200).send({
			data: task,
		});
	} catch (error) {
		await Axios.post(`https://hooks.slack.com/services/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`, {
			text: `!!! Task wurde nicht gefunden oder Fehler bei der Übertragung !!!`,
		});
		res.status(404).send({
			status: 'Error: ' + error,
		});
	}
};

/**
 * Updatet ein Task anhand seiner Id.
 * Erwartet als Parameter eine taskId.
 * Erwartet im Body mindesten einen der zwei Parameter:
 * name, description
 * @param {Request}req Request
 * @param {Response}res Response
 */
export const updateTaskById = async (req, res) => {
	const taskId = req.params.taskId;
	const { name, description } = req.body;
	const taskRepository = getRepository(Task);

	try {
		let task = await taskRepository.findOneOrFail(taskId, { relations: ['trackings', 'labels'] });
		task.name = name;
		task.description = description;

		task = await taskRepository.save(task);

		res.status(200).send({
			data: task,
		});
	} catch (error) {
		res.status(404).send({
			status: 'Error: ' + error,
		});
	}
};
