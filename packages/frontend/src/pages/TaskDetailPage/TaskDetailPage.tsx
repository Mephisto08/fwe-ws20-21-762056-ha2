/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * In dieser Datei, wird eine Task Detail Seite erzeugt.
 * Auf dieser wird der Name, die Beschreibung, die dazugehörigen Labels
 * und die Gesamtdauer angezeigt.
 * Ebenso werden alle Trackings eines Task angeziegt.
 * Durch Klick auf verschiedene Buttons
 * werden folgende Funktionen bereitgestellt:
 * Editieren eines Tasks, anzeigen aller existierden Labels,
 * Labels zu einem Task hinzufügen,
 * löschen von Labels eines Tasks und ein Tracking erstellen.
 */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	Task,
	LabelItem,
	TrackedTime,
	LabelList,
	Label,
	TaskDescription,
	formatTime,
} from '../Dashboard/components/taskList';
import { Layout } from '../../components/Layout';
import { Tracking, TrackingItem, TrackingList } from './components/trackingList';
import { AddButton, AddLabelButton, DeleteLabelsButton, EditButton, ShowLabelButton } from '../../components/Button';
import { EditTaskForm } from './components/editTask';
import { CreateTrackingForm } from './components/createTracking';
import { AddLabelToTaskForm } from './components/addLabelToTask';
import { DeleteLabelFromTaskForm as DeleteLabelFromTaskForm } from './components/deleteLabelFromTask';
import { ShowAllLabelForm } from './components/showAllLabel';

export const TaskDetailPage = () => {
	const { taskId }: any = useParams();
	const [task, setTask] = useState<Task>();
	const [editTask, setEditTask] = useState(false);
	const [addLabelToTask, setAddLabelToTask] = useState(false);
	const [deleteLabelFromTask, setDeleteLabelToTask] = useState(false);
	const [showLabel, setShowLabel] = useState(false);
	const [createTracking, setCreateTracking] = useState(false);

	/**
	 * Berechnet die Gesamtzeit eines Tasks.
	 * @return {Zeit} Return eine Funktion,
	 * die die Berechnete Zeit in Milliskeunden in ein Zeitformat bringt.
	 */
	const getTotalTime = function (): string {
		const ms = task?.trackings.reduce((prev: any, cur: any) => {
			const timeStart = new Date(cur.timeStart);
			const timeEnd = new Date(cur.timeEnd);
			const diff = timeEnd.getTime() - timeStart.getTime();

			return diff + prev;
		}, 0);

		return formatTime(ms);
	};

	/**
	 * Es werden alle Task geladen.
	 */
	const fetchTask = async function () {
		const taskRequest = await fetch(`/api/task/${taskId}`, {
			method: 'GET',
			headers: { 'content-type': 'application/json' },
		});
		if (taskRequest.status === 200) {
			const taskJSON = await taskRequest.json();
			setTask(taskJSON.data);
		}
	};
	useEffect(() => {
		fetchTask();
	}, []);

	return (
		<Layout>
			<AddButton
				onClick={() => {
					setDeleteLabelToTask(false);
					setAddLabelToTask(false);
					setShowLabel(false);
					setEditTask(false);
					setCreateTracking(!createTracking);
				}}
			></AddButton>
			<DeleteLabelsButton
				onClick={() => {
					setCreateTracking(false);
					setAddLabelToTask(false);
					setShowLabel(false);
					setEditTask(false);
					setDeleteLabelToTask(!deleteLabelFromTask);
				}}
			></DeleteLabelsButton>
			<AddLabelButton
				onClick={() => {
					setDeleteLabelToTask(false);
					setCreateTracking(false);
					setShowLabel(false);
					setEditTask(false);
					setAddLabelToTask(!addLabelToTask);
				}}
			></AddLabelButton>
			<ShowLabelButton
				onClick={() => {
					setDeleteLabelToTask(false);
					setAddLabelToTask(false);
					setCreateTracking(false);
					setEditTask(false);
					setShowLabel(!showLabel);
				}}
			></ShowLabelButton>
			<EditButton
				onClick={() => {
					setDeleteLabelToTask(false);
					setAddLabelToTask(false);
					setShowLabel(false);
					setCreateTracking(false);
					setEditTask(!editTask);
				}}
			></EditButton>
			<div
				css={`
					display: flex;
					flex-direction: row;
					width: 100%;
				`}
			>
				<div>
					<h1>{task?.name}</h1>
				</div>
				<TaskDescription>{task?.description}</TaskDescription>
				<div>
					<LabelItem>
						Label:
						<LabelList>
							{task?.labels &&
								task?.labels.map((label: Label) => {
									return (
										<li key={label.id}>
											{label.id} {label.name}
										</li>
									);
								})}
						</LabelList>
					</LabelItem>
				</div>
				<TrackedTime>Gesamtdauer des Tasks: {getTotalTime()}</TrackedTime>
				<div
					css={`
						flex: 1;
						justify-content: flex-end;
						display: flex;
						align-items: top;
					`}
				></div>
			</div>
			{editTask && (
				<EditTaskForm
					afterSubmit={() => {
						setEditTask(false);
						fetchTask();
					}}
					taskObject={task!}
				/>
			)}
			{addLabelToTask && (
				<AddLabelToTaskForm
					afterSubmit={() => {
						setAddLabelToTask(false);
						fetchTask();
					}}
					taskObject={task!}
				/>
			)}
			{deleteLabelFromTask && (
				<DeleteLabelFromTaskForm
					afterSubmit={() => {
						setDeleteLabelToTask(false);
						fetchTask();
					}}
					taskObject={task!}
				/>
			)}
			{createTracking && (
				<CreateTrackingForm
					afterSubmit={() => {
						setCreateTracking(false);
						fetchTask();
					}}
					taskObject={task!}
				/>
			)}
			{showLabel && (
				<ShowAllLabelForm
					afterSubmit={() => {
						setShowLabel(false);
						fetchTask();
					}}
				/>
			)}

			<TrackingList>
				{task?.trackings.map((tracking: Tracking) => (
					<TrackingItem key={tracking.id} tracking={tracking} fetchTask={fetchTask}></TrackingItem>
				))}
			</TrackingList>
		</Layout>
	);
};
