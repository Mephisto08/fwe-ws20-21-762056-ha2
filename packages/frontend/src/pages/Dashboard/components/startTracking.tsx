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


  const creationTime = startTime;
  const taskName = useContext(taskNameContext);
  const taskId = useContext(taskIdContext);
  const [tracking, setTracking] = useState({
    description: "",
    task: `${taskId}`,
  });

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

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
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
      fetchTask();
      afterSubmit();
    

  };

  useEffect(() => {
      const actualTime = setTimeout(() => {
        setTrackingTime(actualTrackingTime());
      }, 1000);
  });


  return (
    <>
      <StartTracking>
        {console.log(trackingTime + "return")}
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
          <Button8rem type="submit">
            {true ? "Pause" : "Start Track."}
          </Button8rem>
          <StopButton type="button"></StopButton>
        </form>
      </StartTracking>
    </>
  );
};