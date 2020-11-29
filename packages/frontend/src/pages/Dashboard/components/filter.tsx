import React, {useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { Button20rem} from "../../../components/Button";

export const FilterForm: React.FC<{ afterSubmit: () => void;setTaskFilter: any;}> = ({
  afterSubmit,
  setTaskFilter,
}) => {
  const [values, setValues] = useState({
    taskName: "",
    taskDescription: "",
    taskLabel: "",
  });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
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
