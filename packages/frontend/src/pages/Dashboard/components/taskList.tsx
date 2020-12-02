/**
 * In dieser Datei, wird ein Task Item erstellt.
 * Ebenso wird das Layout erstellt für das aussehen der Liste der Task.
 */
import React, {useState} from "react";
import styled from "styled-components";
import {Button8rem, DeleteButton} from "../../../components/Button";
import {StartTrackingForm} from "./startTracking";

// Hier werden Contexte bereitgestellt, die benötigt werden 
const defaultValue: any = "";
export const taskNameContext = React.createContext(defaultValue);
export const taskIdContext = React.createContext(defaultValue);
export const trackingStartDate = React.createContext(new Date());

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
  clear:both;
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

/**
 * Damit die der Titel nicht über sein Feld hinaus geht, wird mit text-overflow gearbeitet.
 * Jedoch konnte nicht auf die Größe des parents des Elementes zugreifen.
 * Deßhalb wurde für die maximale Größe eine Pixel angabe gemacht, die den Browser geeigenet sind.
 * Für Responsives Design ist dies nicht sinnvoll. Un muss abgeändert werden zu relativen Angaben
 */
export const TaskTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  margin: 0;
  float: left;
  max-width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
`;

/**
 * Damit die der Titel nicht über sein Feld hinaus geht, wird mit text-overflow gearbeitet.
 * Jedoch konnte nicht auf die Größe des parents des Elementes zugreifen.
 * Deßhalb wurde für die maximale Größe eine Pixel angabe gemacht, die den Browser geeigenet sind.
 * Für Responsives Design ist dies nicht sinnvoll. Un muss abgeändert werden zu relativen Angaben
 */
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

export type TaskItemProps = {
  task: Task;
  onClick?: (task: Task) => void;
  fetchTask: () => void;
  setTaskTrackingId: any;
  taskTrackingId: Number;
};

/**
 * Rechnet Millisekunden in das Format  Stunden:Minuten:Sekunden um.
 * @param ms Zeit in Millisekunden. Diese werden in das Format Stunden:Minuten:Sekunden umgerechnet.
 */
export function formatTime(ms: any) {
  var pad = function (num: number, size: number) { return ('000' + num).slice(size * -1); };
  let seconds = ms / 1000;
  const hours = parseInt((seconds / 3600).toString());
  seconds = seconds % 3600;
  const minutes = parseInt((seconds / 60).toString());
  seconds = seconds % 60;

  return (pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2));
}

/**
 * Erstellt ein TaskItem. In diesem kann ein Task gelöscht werden,
 * ein Tracking für ein Task gestartet werden.
 * Ebenso wird hier der Name, die Beschreibung, die gesamt Zeit
 * sowie die dazugehörigen Labels eines Task angzeigt.
 */
export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onClick = () => { },
  fetchTask,
  taskTrackingId,
  setTaskTrackingId,

}) => {
  const { id, name, description, labels } = task;
  const [startTracking, setStartTracking] = useState(false);

  /**
   * Löscht einen Task aus der Taskliste
   */
  const deleteTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(`/api/task/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    fetchTask();
  };

  /**
   * Berechnet die Gesamtzeit eines Task.
   */
  const getTotalTime = function (): string {
    const ms = task?.trackings.reduce((prev: any, cur: any) => {
      const timeStart = new Date(cur.timeStart);
      const timeEnd = new Date(cur.timeEnd);
      const diff = (timeEnd.getTime() - timeStart.getTime());

      return diff + prev;
    }, 0);

    return formatTime(ms);
  }

  const totalTimeOfTask = getTotalTime();

  /**
   * Erstellt die Startzeit, wenn ein Tracking gestartet wird.
   */
  const startTrackingTime = function (): any {
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
              <TrackedTime>Gesamt Zeit: {totalTimeOfTask}</TrackedTime>
            </div>
          </TaskFlex>
          <div>
            <Button8rem
              onClick={() => {
                setTaskTrackingId(id);
                setStartTracking(!startTracking);
              }}
              disabled={taskTrackingId == id || taskTrackingId == -1 ? false : true}
            >{!startTracking ? "Start Track." : "Abbrechen"}
            </Button8rem>
          </div>
          {startTracking && (
            <StartTrackingForm
              fetchTask={fetchTask}
              startTime={startTrackingTime()}
              afterSubmit={() => { setStartTracking(false); setTaskTrackingId(-1); }}
            />
          )}
        </taskIdContext.Provider>
      </taskNameContext.Provider>
    </TaskItemStyle>
  );
};
