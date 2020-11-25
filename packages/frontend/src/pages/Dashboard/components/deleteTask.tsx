import React, { useContext, useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { Button20rem} from "../../../components/Button";

export const AddTaskForm: React.FC<{ afterSubmit: () => void }> = ({
  afterSubmit,
}) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
  });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    await fetch("/api/task", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        ...values,
      }),
    });
    afterSubmit();
  };
  return (
    <>
      <h3>Füge einen Task hinzu!</h3>

      <form onSubmit={onSubmitForm}>
        <Input
          name="name"
          label="Name"
          type="text"
          onChange={fieldDidChange}
          required
        />
        <Input
          name="description"
          label="Beschreibung"
          type="text"
          onChange={fieldDidChange}
          required
        />
        <Button20rem type="submit">Füge einen Task hinzu!</Button20rem>
      </form>
    </>
  );
};
