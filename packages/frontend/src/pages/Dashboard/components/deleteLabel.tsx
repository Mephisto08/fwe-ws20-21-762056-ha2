/**
 * In dieser Datei, wird alles bereitgestellt,
 * um ein label zu löschen.
 */
import React, { useState, ChangeEvent } from 'react';
import { Input } from '../../../components/input/Input';
import { Button20rem } from '../../../components/Button';

export const DeleteLabelForm: React.FC<{ afterSubmit: () => void }> = ({ afterSubmit }) => {
	const [values, setValues] = useState({
		name: '',
	});

	const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const labelRequest = await fetch('/api/label', {
			headers: { 'Content-Type': 'application/json' },
		});
		if (labelRequest.status === 200) {
			const labelJSON = await labelRequest.json();

			for (let i = 0; i < Object.keys(labelJSON.data).length; i++) {
				if (labelJSON.data[i].name === values.name) {
					await fetch(`/api/label/${labelJSON.data[i].id}`, {
						method: 'DELETE',
						headers: { 'Content-Type': 'application/json' },
					});
					afterSubmit();
					return;
				}
			}
		}
		afterSubmit();
	};
	return (
		<>
			<form onSubmit={onSubmitForm}>
				<Input name="name" label="Label Name" type="text" onChange={fieldDidChange} required />
				<Button20rem type="submit">Lösche Label!</Button20rem>
			</form>
		</>
	);
};
