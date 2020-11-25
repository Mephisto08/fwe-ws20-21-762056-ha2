import React, { ChangeEvent, useContext } from "react";
import {useState} from "react";
import styled from "styled-components";
import {Button8rem, StopButton } from "../../../components/Button";
import {Input} from "../../../components/Input";
import { testContext } from "./taskList";

export const Time = styled.div`
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;




export const StartTrackingForm: React.FC<{ afterSubmit: () => void }> = ({
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
    let taskName= useContext(testContext);

    return (
      <>
            <h2>Starte ein Tracking für {taskName} </h2>
            <Time>Zeit:</Time>
    
            <form onSubmit={onSubmitForm}>
            <Input
                name="description"
                label="Beschreibung"
                type="text"
                onChange={fieldDidChange}
                required
            />
            <Button8rem type="submit">Start</Button8rem>
            <StopButton type="button">Start</StopButton>
            </form>
      </>
    );
  };