/**
 * In dieser Datei, wird alles bereitgestellt,
 * um ein oder mehrere Labels von einem Task zulöschen.
 */
import React, { useState, ChangeEvent } from 'react';
import { Input } from '../../../components/input/Input';
import { Button20rem } from '../../../components/Button';
import { Task } from '../../Dashboard/components/taskList';

interface EditTrackingFormState {
	id: number;
}

export const DeleteLabelFromTaskForm: React.FC<{
	afterSubmit: () => void;
	taskObject: Task;
}> = ({ afterSubmit, taskObject }) => {
	const [values] = useState<EditTrackingFormState>(taskObject);
	const [label, setLabel] = useState({
		labelList: '',
	});
	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLabel({ ...label, [e.target.name]: e.target.value });
	};
	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await fetch(`/api/task/label/${values.id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				labelList: label.labelList.split(','),
			}),
		});
		afterSubmit();
	};
	return (
		<>
			<h3>Lösche Label/s</h3>

			<form onSubmit={onSubmitForm}>
				<Input name="labelList" label="Labels" type="text" onChange={fieldDidChange} required />
				<Input name="task" label="Task" type="text" value={values.id} onChange={fieldDidChange} required disabled />
				<Button20rem type="submit">Lösche Label/s von diesem Task!</Button20rem>
			</form>
		</>
	);
};
