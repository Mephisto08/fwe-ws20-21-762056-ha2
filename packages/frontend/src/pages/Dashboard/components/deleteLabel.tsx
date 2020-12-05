/**
 * In dieser Datei, wird alles bereitgestellt,
 * um ein label zu löschen.
 */
import React, {useState, ChangeEvent} from 'react';
import {Input} from '../../../components/Input';
import {Button20rem} from '../../../components/Button';

export const DeleteLabelForm: React.FC<{ afterSubmit: () => void }> = ({
  afterSubmit,
}) => {
  const [values, setValues] = useState({
    id: '',
  });

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({...values, [e.target.name]: e.target.value});
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`/api/label/${values.id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
      }),
    });
    afterSubmit();
  };
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <Input
          name="id"
          label="Label Id"
          type="text"
          onChange={fieldDidChange}
          required
        />
        <Button20rem type="submit">Lösche Label/s von diesem Task!</Button20rem>
      </form>
    </>
  );
};
