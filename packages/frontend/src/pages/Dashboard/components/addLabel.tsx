import React, {useState, ChangeEvent } from "react";
import { Input } from "../../../components/Input";
import { Button20rem} from "../../../components/Button";

export const AddLabelForm: React.FC<{ afterSubmit: () => void;}> = ({
  afterSubmit,
}) => {
    const [values, setValues] = useState({
        name: "",
      });
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);

    await fetch("/api/label", {
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
      <form onSubmit={onSubmitForm}>
        <Input
          name="name"
          label="Name"
          type="text"
          onChange={fieldDidChange}
          required
        />
        <Button20rem type="submit">Erstelle ein Label!</Button20rem>
      </form>
    </>
  );
};
