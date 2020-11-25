import React, { useContext, useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import {ButtonModal} from "../../../components/Button";
import { Tracking } from "../../Dashboard/components/taskList";

interface EditTrackingFormState {
  id: number;
  description: string;
  timeStart: Date;
  timeEnd: Date;
}

export const EditTrackingForm: React.FC<{ afterSubmit: () => void; trackingObject: Tracking;}> = ({
  afterSubmit,
  trackingObject,
}) => {
  const [values, setValues] = useState<EditTrackingFormState>(trackingObject);

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  console.log(values);

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    await fetch(`/api/tracking/${values.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        ...values,
      }),
    });
    afterSubmit();
  };
  
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <Input
          name="description"
          label="Beschreibung"
          type="text"
          onChange={fieldDidChange}
          value={values.description}
          required
        />
        <Input
          name="timeStart"
          label="Start"
          type="text"
          onChange={fieldDidChange}
          value={(values.timeStart.toString())}
          required
        />
        <Input
          name="timeEnd"
          label="Ende"
          type="text"
          onChange={fieldDidChange}
          value={(values.timeEnd.toString())}
          required
        />
        <ButtonModal type="submit">Bestätige die Änderungen</ButtonModal>
      </form>
    </>
  );
};
