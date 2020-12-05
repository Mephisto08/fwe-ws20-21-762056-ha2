/**
 * In dieser Datei, wird das Form erstellt in dem man nach Task Name,
 * Task Beschreibung und Labels von Tasks filter kann.
 */
import React, {useState, ChangeEvent} from 'react';
import {Input} from '../../../components/Input';
import {Button20rem} from '../../../components/Button';

/**
 * Es wird afterSubmit bereitgestellt.
 * In dieser Funktion kann man als Aufrufender der Form alles angeben,
 * was nach dem submiten gemacht werden soll.
 * setTAskFilter wird übergeben und nach dem eingeben der Daten
 * in das Form werden die eingeben Formulardaten,
 * in setTaskFilter ges
 * @return {HTML} HTML-Grundgerüst
 */
export const FilterForm: React.FC<{
  afterSubmit: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTaskFilter: any; }> = ({
    afterSubmit,
    setTaskFilter,
  }) => {
    const [values, setValues] = useState({
      taskName: '',
      taskDescription: '',
      taskLabel: '',
    });

    const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValues({...values, [e.target.name]: e.target.value});
    };

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setTaskFilter(values);
      afterSubmit();
    };
    return (
      <>
        <form onSubmit={onSubmitForm}>
          <Input
            name="taskName"
            label="Task Name"
            type="text"
            onChange={fieldDidChange}
          />
          <Input
            name="taskDescription"
            label="Task Beschreibung"
            type="text"
            onChange={fieldDidChange}
          />
          <Input
            name="taskLabel"
            label="Label Name"
            type="text"
            onChange={fieldDidChange}
          />
          <Button20rem type="submit">Filter anwenden!</Button20rem>
        </form>
      </>
    );
  };
