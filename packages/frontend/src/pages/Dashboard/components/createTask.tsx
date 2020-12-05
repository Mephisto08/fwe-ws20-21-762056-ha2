/**
 * In dieer Datei wird das Layout un die Funktionalität bereitgestellt
 * um Task erstellen zu können.
 */
import React, { useState, ChangeEvent } from 'react';
import { Input } from '../../../components/input/Input';
import { Button20rem } from '../../../components/Button';

/**
 * Es wird das Layout und die Funktionaltät bereitgestellt, Task zu erstellen.
 * @param {param0} afterSubmit wird wird bereitgestellt.
 * Diese Funktion wird ausgeführt, nachdem das Formular abgeschicht wurde.
 * @return {HTML} HTML-Gerüst
 */
export const CreateTaskForm: React.FC<{ afterSubmit: () => void }> = ({ afterSubmit }) => {
	const [values, setValues] = useState({
		name: '',
		description: '',
	});

	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await fetch('/api/task', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				...values,
			}),
		});
		afterSubmit();
	};

	return (
		<>
			<form onSubmit={onSubmitForm}>
				<Input name="name" label="Name" type="text" onChange={fieldDidChange} required />
				<Input name="description" label="Beschreibung" type="text" onChange={fieldDidChange} required />
				<Button20rem type="submit">Erstelle einen Task!</Button20rem>
			</form>
		</>
	);
};
