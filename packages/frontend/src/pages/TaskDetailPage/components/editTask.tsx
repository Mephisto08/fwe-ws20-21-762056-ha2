/**
 * In dieser Datei, wird alles bereitgestellt,
 * um eine Task zueditieren. Hierbei kann der Name
 * und/oder die Beschreibung verändert werden.
 */
import React, { useState, ChangeEvent } from 'react';
import { Button20rem } from '../../../components/Button';
import { Input } from '../../../components/input/Input';
import { Task } from '../../Dashboard/components/taskList';

interface EditTaskFormState {
	id: number;
	name: string;
	description: string;
}

export const EditTaskForm: React.FC<{
	afterSubmit: () => void;
	taskObject: Task;
}> = ({ afterSubmit, taskObject }) => {
	const [values, setValues] = useState<EditTaskFormState>(taskObject);
	
	const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		if(format.test(e.target.value)){
			alert("Sonderzeichen sind im Namen nicht erlaubt. Bitte entferne das letzt eingegebene Zeichen!");
			e.target.value = "";
		}else{
			setValues({ ...values, [e.target.name]: e.target.value });
		}
	};

	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await fetch(`/api/task/${values.id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				...values,
			}),
		});
		afterSubmit();
	};

	return (
		<>
			<h3>Editiere den Task!</h3>

			<form onSubmit={onSubmitForm}>
				<Input name="name" label="Name" type="text" onChange={fieldDidChange} value={values.name} required />
				<Input
					name="description"
					label="Beschreibung"
					type="text"
					onChange={fieldDidChange}
					value={values.description}
					required
				/>
				<Button20rem type="submit">Bestätige die Änderungen!</Button20rem>
			</form>
		</>
	);
};
