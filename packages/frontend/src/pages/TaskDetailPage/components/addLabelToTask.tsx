import React, { useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { Button20rem } from "../../../components/Button";
import { Task } from "../../Dashboard/components/taskList";

interface EditTrackingFormState {
  id: number;
}

export const AddLabelToTaskForm: React.FC<{ afterSubmit: () => void; taskObject: Task; }> = ({
  afterSubmit,
  taskObject,
}) => {
  const [values, setValues] = useState<EditTrackingFormState>(taskObject);
  const [label, setLabel] = useState({
    labelList: "",
  });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLabel({ ...label, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`/api/task/label/${values.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "labelList": label.labelList.split(","),
      }),
    });
    afterSubmit();
  };
  return (
    <>
      <h3>Füge ein Label zu einem Task hinzu!</h3>

      <form onSubmit={onSubmitForm}>
        <Input
          name="labelList"
          label="Labels"
          type="text"
          onChange={fieldDidChange}
          required
        />
        <Input
          name="task"
          label="Task"
          type="text"
          value={values.id}
          onChange={fieldDidChange}
          required
          disabled
        />
        <Button20rem type="submit">Füge ein Tracking zum Task hinzu!</Button20rem>
      </form>
    </>
  );
};
