import React, { ChangeEvent, useContext, useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Button8rem, StopButton } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { msToHMS, taskIdContext, taskNameContext } from "./taskList";

export const Time = styled.div`
    font-size: 1.2rem;
    margin-bottom: 1rem;
`;


export const Title = styled.div`
    font-size: 1.4rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
`;

export const StartTracking = styled.div`
    margin-bottom: 1rem;
    margin-top: 1rem;
    border-top: 0.15rem solid #202020;
`;

export const StartTrackingForm: React.FC<{ afterSubmit: () => void; startTime: any; fetchTask: () => void; }> = ({
  afterSubmit,
  startTime,
  fetchTask,
}) => {
  let creationTime = startTime;
  const taskName = useContext(taskNameContext);
  const taskId = useContext(taskIdContext);
  const [tracking, setTracking] = useState({
    description: "",
    task: `${taskId}`,
  });
  const [buttonText, setButtonText] = useState("Pause");
  const [paused, setPaused] = useState(false);
  const [stop, setStop] = useState(false);
  let changeText: any;
  let currentTime: Date;


  const actualTrackingTime = function (): string {
    currentTime = new Date();
    const diff = (currentTime.getTime() - creationTime.getTime());
    return msToHMS(diff - diff % 1000);
  };
  const [trackingTime, setTrackingTime] = useState(actualTrackingTime());

  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTracking({ ...tracking, [e.target.name]: e.target.value });
  };

  changeText = (text: React.SetStateAction<string>) => setButtonText(text);


  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    
    console.log(paused, '+paused+stop+', stop);
    setPaused(!paused);
    console.log(paused, '+paused+stop+', stop);

    e.preventDefault();



    if (stop) {
      if (paused) {
        afterSubmit();
      } else if (!paused) {
        await fetch("/api/tracking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "description": `${tracking.description}`,
            "task": `${tracking.task}`,
            "timeStart": `${creationTime}`,
            "timeEnd": `${currentTime}`,
          }),
        });
        afterSubmit();
      }
    } else if (!stop) {
      if (!paused) {
        await fetch("/api/tracking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "description": `${tracking.description}`,
            "task": `${tracking.task}`,
            "timeStart": `${creationTime}`,
            "timeEnd": `${currentTime}`,

          }),
        });
      }
    }
    if (paused == false) {
      creationTime = new Date();
    }
    fetchTask();
  };

  useEffect(() => {
    if (!paused) {
      const actualTime = setTimeout(() => {
        setTrackingTime(actualTrackingTime());
      }, 1000);
    }
  });



  return (
    <>
      <StartTracking>
        <Title>Starte ein Tracking für {taskName} </Title>
        <Time>Zeit:  {trackingTime}</Time>

        <form onSubmit={onSubmitForm}>
          <Input
            name="description"
            label="Beschreibung"
            onChange={fieldDidChange}
            type="text"
            required
          />
          <Button8rem type='submit' onClick={() => changeText(paused ? "Pause" : "Weiter")}>{buttonText}</Button8rem>
          <StopButton type='submit' onClick={() => setStop(true)}></StopButton>
        </form>
      </StartTracking>
    </>
  );
};