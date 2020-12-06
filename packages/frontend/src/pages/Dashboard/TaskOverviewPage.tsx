/**
 * Dies ist die Startseite der Anwendung.
 * Auf dieser Seite werden alle Task angezeigt.
 * Ebenso können auf dieser Seite Task erstellt werden auf dem + Button.
 * Es können Labels erstellt weden und es
 * kann ein Filter auf die Task angewendet werden.
 * Man kann nach Task Description, Label von Task und Task Namen filtern.
 */
import React, { useEffect, useState } from 'react';
// Dieser Import wird zwar nicht angezeigt als nicht benötigt,
// jedoch verändert sich das Layout, wenn der Import entfernt wird.
// Deswegen bleubt er erhalten.
// eslint-disable-next-line
import styled from 'styled-components/macro';
import { Task, TaskList, TaskItem } from './components/taskList';
import {
	AddButton,
	CreateLabelButton,
	DeleteLabelsButton,
	FilterButton,
	ShowLabelButton,
} from '../../components/Button';
import { CreateTaskForm } from './components/createTask';
import { Layout } from '../../components/Layout';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../components/Modal';
import { CreateLabelForm } from './components/createLabel';
import { FilterForm } from './components/filter';
import { ShowAllLabelForm } from '../TaskDetailPage/components/showAllLabel';
import { DeleteLabelForm } from './components/deleteLabel';

// eslint-disable-next-line
export const TaskOverviewPage = () => {
	const [allTask, setTask] = useState<Task[]>([]);
	const [createTask, setCreateTask] = useState(false);
	const [createLabel, setCreateLabel] = useState(false);
	const [taskFilter, setTaskFilter] = useState({ taskName: '', taskDescription: '', taskLabel: '' });
	const [filter, setFilter] = useState(false);
	const [taskTrackingId, setTaskTrackingId] = useState(-1);
	const [showLabel, setShowLabel] = useState(false);
	const [deleteLabel, setDeleteLabel] = useState(false);
	const history = useHistory();

	/**
	 * Es werden alle Task geladen. Dabei werden auch die Filter mitgesendet.
	 * Wenn diese nicht gesetzt wurden durch den Anwender,
	 * werden sie als leere Strings mitgeschickt.
	 * Dies hat somit keine Ausiwrkunng auff den fetch.
	 */
	const fetchTask = async function () {
		const tasksRequest = await fetch(
			// eslint-disable-next-line
        `/api/task?filterTask=${taskFilter.taskName}&filterDescription=${taskFilter.taskDescription}&filterLabel=${taskFilter.taskLabel}`, {
				method: 'GET',
				headers: { 'content-type': 'application/json' },
			},
		);
		if (tasksRequest.status === 200) {
			const taskJSON = await tasksRequest.json();
			setTask(taskJSON.data);
		}
	};

	useEffect(() => {
		fetchTask();
	}, [taskFilter]);

	return (
		<Layout>
			<div
				css={`
					display: flex;
					flex-direction: row;
					width: 100%;
				`}
			>
				<div>
					<h1>Tasks</h1>
				</div>
				<div
					css={`
						flex: 1;
						justify-content: flex-end;
						display: flex;
						align-items: top;
					`}
				>
					<FilterButton
						onClick={() => {
							setShowLabel(false);
							setFilter(!filter);
						}}
					/>
					<ShowLabelButton
						onClick={() => {
							setShowLabel(!showLabel);
						}}
					/>
					<CreateLabelButton
						onClick={() => {
							setShowLabel(false);
							setCreateLabel(!createLabel);
						}}
					/>
					<DeleteLabelsButton
						onClick={() => {
							setShowLabel(false);
							setDeleteLabel(!deleteLabel);
						}}
					/>
					<AddButton
						data-testid="create-task-button"
						onClick={() => {
							setShowLabel(false);
							setCreateTask(!createTask);
						}}
					/>
				</div>
			</div>
			{filter && (
				<Modal
					title="Filtern"
					onCancel={() => {
						setFilter(false);
					}}
				>
					<FilterForm
						afterSubmit={() => {
							setFilter(false);
							fetchTask();
						}}
						setTaskFilter={setTaskFilter}
					/>
				</Modal>
			)}
			{createLabel && (
				<Modal
					title="Label erstellen"
					onCancel={() => {
						setCreateLabel(false);
					}}
				>
					<CreateLabelForm
						afterSubmit={() => {
							setCreateLabel(false);
							fetchTask();
						}}
					/>
				</Modal>
			)}
			{deleteLabel && (
				<Modal
					title="Label löschen"
					onCancel={() => {
						setDeleteLabel(false);
					}}
				>
					<DeleteLabelForm
						afterSubmit={() => {
							setDeleteLabel(false);
							fetchTask();
						}}
					/>
				</Modal>
			)}
			{createTask && (
				<Modal
					title="Task erstellen"
					onCancel={() => {
						setCreateTask(false);
					}}
				>
					<CreateTaskForm
						afterSubmit={() => {
							setCreateTask(false);
							fetchTask();
						}}
					/>
				</Modal>
			)}
			{showLabel && (
				<ShowAllLabelForm
					afterSubmit={() => {
						setShowLabel(false);
						fetchTask();
					}}
				/>
			)}
			<TaskList>
				{allTask.map((allTask) => (
					<TaskItem
						onClick={() => history.push(`/task/${allTask.id}`)}
						key={allTask.id}
						task={allTask}
						fetchTask={fetchTask}
						taskTrackingId={taskTrackingId}
						setTaskTrackingId={setTaskTrackingId}
					></TaskItem>
				))}
			</TaskList>
		</Layout>
	);
};
