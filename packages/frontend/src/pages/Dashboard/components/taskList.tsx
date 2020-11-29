import React, { useState } from "react";
import styled from "styled-components";
import { Button8rem, DeleteButton } from "../../../components/Button";
import { StartTrackingForm } from "./startTracking";

const defaultValue: any = "";
export const taskNameContext = React.createContext(defaultValue);
export const taskIdContext = React.createContext(defaultValue);
export const trackingStartDate = React.createContext(new Date());


export enum TaskType {
  INCOME = "income",
  EXPENSE = "expense",
}

export type Label = {
  id: number;
  name: string;
  created: string;
  updated: string;
};

export type Tracking = {
  id: number;
  description: string;
  created: string;
  updated: string;
  timeStart: Date;
  timeEnd: Date;
};

export type Task = {
  id: number;
  name: string;
  description: string;
  created: string;
  updated: string;
  labels: Label[];
  trackings: Tracking[];
};

export const LabelList = styled.div`
  list-style: none;
  flex-grow: 1;
  font-size: 0.8rem;
  align-self: flex-end;
  display: flex;
  float: right;
  & > li {
    margin-right: 0.5rem;
    padding: 0.125rem;
    border-radius: 0.25rem;
    background-color: ${(props) => props.theme.colors.primary};
    display: block;
    color: #000;
  }
`;

export const TaskFlex = styled.div`
  display: flex;
  align-items: center;
  
`;

export const TaskHighlight = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: none;
  width: 4px;
  background-color: ${(props) => props.theme.colors.primary};
`;

export const TaskItemStyle = styled.div`
  margin: 0;
  min-height: 9rem;
  max-width: 100%;
  position: relative;
  padding: 0.7rem 2rem;
  &:hover {
    ${TaskHighlight} {
      display: block;
    }
  }
`;
export const TaskList = styled.div`
  list-style: none;
  box-shadow: 0 0.125em 0.25em 0 ${(props) => props.theme.colors.shadowColor};
  width: 100%;
  padding: 0;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.colors.listBackgroundColor};
  ${TaskItemStyle} {
    border-bottom: 1px ${(props) => props.theme.colors.shadowColor} solid;
    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

export const TaskTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
  float: left;
`;

// Px genutzt für max-width
export const TaskDescription = styled.div`
  font-size: 1rem;
  margin: 0;
  margin-top: 1.6rem;
  max-width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
`;

export const LabelItem = styled.div` 
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  margin-top: 0.5rem; 
`;

export const TrackedTime = styled.div`
  font-size: 1.1rem;
  font-weight: 400;
  margin: 0;
  padding-top: 0.5rem; 
`;


export const TaskValue = styled.div`
  white-space: nowrap;
`;
export type TaskItemProps = {
  task: Task;
  onClick?: (task: Task) => void;
  fetchTask: () => void;
};

export function msToHMS(ms: any) {
  var pad = function (num: number, size: number) { return ('000' + num).slice(size * -1); };

  let seconds = ms / 1000;
  let hours = parseInt((seconds / 3600).toString()); // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  let minutes = parseInt((seconds / 60).toString()); // 60 seconds in 1 minute
  seconds = seconds % 60;

  return (pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2));
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onClick = () => { },
  fetchTask,

}) => {
  const { id, name, description, labels } = task;
  const [startTracking, setStartTracking] = useState(false);

  const deleteTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(`/api/task/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    fetchTask();
  };

  const getDateDifference = function (): string {
    const ms = task?.trackings.reduce((prev: any, cur: any) => {
      const timeStart = new Date(cur.timeStart);
      const timeEnd = new Date(cur.timeEnd);
      const diff = (timeEnd.getTime() - timeStart.getTime());

      return diff + prev;
    }, 0);

    return msToHMS(ms);
  }

  const setTimer = function (): any {
    const creationDate = new Date();
    return creationDate;
  }

  return (
    <TaskItemStyle>
      <TaskHighlight />
      <taskNameContext.Provider value={name}>
        <taskIdContext.Provider value={id}>
          <div>
            <DeleteButton onClick={deleteTask}></DeleteButton>
          </div>
          <TaskFlex onClick={() => {
            console.log(task);
            onClick(task);
          }}
          >
            <div>
              <TaskTitle>{name}</TaskTitle>
              <TaskDescription>{description}</TaskDescription>
              <LabelItem>
                Label:
              <LabelList>
                  {labels &&
                    labels.map((label: Label) => {
                      return <li key={label.id}>{label.id} {label.name}</li>;
                    })}
                </LabelList>
              </LabelItem>
              <TrackedTime>Gesamt Zeit: {getDateDifference()}</TrackedTime>
            </div>
          </TaskFlex>
          <div>
            <Button8rem onClick={() => {
              setStartTracking(!startTracking)
            }}>{!startTracking ? "Start Track." : "Abbrechen"}</Button8rem>
          </div>
          {startTracking && (
            <StartTrackingForm
              fetchTask= {fetchTask}
              startTime={setTimer()}
              afterSubmit={() => {setStartTracking(false)}}
            />
          )}
        </taskIdContext.Provider>
      </taskNameContext.Provider>
    </TaskItemStyle>
  );
};
