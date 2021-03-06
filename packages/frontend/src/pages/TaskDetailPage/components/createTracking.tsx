/**
 * In dieser Datei, wird alles bereitgestellt,
 * um ein Tracking zu erstellen.
 */
import React, { useState, ChangeEvent } from 'react';
import { Input } from '../../../components/input/Input';
import { Button20rem } from '../../../components/Button';
import { Task } from '../../Dashboard/components/taskList';

interface EditTrackingFormState {
	id: number;
}

export const CreateTrackingForm: React.FC<{
	afterSubmit: () => void;
	taskObject: Task;
}> = ({ afterSubmit, taskObject }) => {
	const [values] = useState<EditTrackingFormState>(taskObject);
	const [tracking, setTracking] = useState({
		description: '',
		task: `${values.id}`,
	});

	const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		if(format.test(e.target.value)){
			alert("Sonderzeichen sind im Namen nicht erlaubt!");
			e.target.value = "";
		}else{
		setTracking({ ...tracking, [e.target.name]: e.target.value });
		}
	};
	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await fetch('/api/tracking', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				...tracking,
			}),
		});
		afterSubmit();
	};
	return (
		<>
			<h3>Erstelle ein Tracking</h3>

			<form onSubmit={onSubmitForm} data-testid="create-tracking-form">
				<Input name="description" label="Beschreibung" type="text" onChange={fieldDidChange} required />
				<Input name="task" label="Task" type="text" value={values.id} onChange={fieldDidChange} required disabled />
				<Button20rem type="submit">Erstelle ein Tracking für diesen Task!</Button20rem>
			</form>
		</>
	);
};
