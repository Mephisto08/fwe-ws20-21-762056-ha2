/**
 * In dieser Datei, wird eine Task Detail Seite erzeugt.
 * Auf dieser wird der Name, die Beschreibung, die dazugehörigen Labels
 * und die Gesamtdauer angezeigt.
 * Ebenso werden alle Trackings eines Task angeziegt.
 * Durch Klick auf verschiedene Buttons werden folgende Funktionen bereitgestellt:
 * Editieren eines Tasks, anzeigen aller existierden Labels, Labels zu einem Task hinzufügen,
 * löschen von Labels eines Tasks und ein Tracking erstellen.  
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Task, LabelItem, TrackedTime, LabelList, Label, TaskDescription, formatTime } from "../Dashboard/components/taskList";
import { Layout } from "../../components/Layout";
import { Tracking, TrackingItem, TrackingList } from "./components/trackingList";
import { AddButton, AddLabelButton, DeleteLabelButton, EditButton, ShowLabelButton } from "../../components/Button";
import { EditTaskForm } from "./components/editTask";
import { AddTrackingForm } from "./components/addTracking";
import { AddLabelToTaskForm } from "./components/addLabelToTask";
import { DeleteLabelToTaskForm as DeleteLabelFromTaskForm } from "./components/deleteLabelFromTask";
import { ShowLabelForm } from "./components/showLabel";


export const TaskPageID = () => {
  const { taskId }: any = useParams();
  const [task, setTask] = useState<Task>();
  const [editTask, setEditTask] = useState(false);
  const [addLabelToTask, setAddLabelToTask] = useState(false);
  const [deleteLabelToTask, setDeleteLabelToTask] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [createTracking, setCreateTracking] = useState(false);

  /**
   * Berechnet die Gesamtzeit eines Tasks.
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


  const fetchTask = async function () {
    const taskRequest = await fetch(`/api/task/${taskId}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setTask(taskJSON.data);
    }
  };
  useEffect(() => {
    fetchTask();
  }, []);


  return (
    <Layout>
      <AddButton
        onClick={() => {
          setCreateTracking(!createTracking);
        }}
      ></AddButton>
      <DeleteLabelButton
        onClick={() => {
          setDeleteLabelToTask(!deleteLabelToTask);
        }}
      ></DeleteLabelButton>
      <AddLabelButton
        onClick={() => {
          setAddLabelToTask(!addLabelToTask);
        }}
      ></AddLabelButton>
      <ShowLabelButton
        onClick={() => {
          setShowLabel(!showLabel);
        }}
      ></ShowLabelButton>
      <EditButton
        onClick={() => {
          setEditTask(!editTask);
        }}
      ></EditButton>
      <div
        css={`
              display: flex;
              flex-direction: row;
              width: 100%;
            `}
      >
        <div>
          <h1>{task?.name}</h1>
        </div>
        <TaskDescription>{task?.description}</TaskDescription>
        <div>
          <LabelItem>
            Label:
                    <LabelList>
              {task?.labels &&
                task?.labels.map((label: Label) => {
                  return <li key={label.id}>{label.id} {label.name}</li>;
                })}
            </LabelList>
          </LabelItem>

        </div>
        <TrackedTime>Gesamtdauer des Tasks: {getTotalTime()}</TrackedTime>
        <div
          css={`
                flex: 1;
                justify-content: flex-end;
                display: flex;
                align-items: top;
              `}
        >
        </div>
      </div>
      {createTracking && (
        <AddTrackingForm
          afterSubmit={() => {
            setCreateTracking(false);
            fetchTask();
          }}
          taskObject={task!}
        />
      )}
      {deleteLabelToTask && (
        <DeleteLabelFromTaskForm
          afterSubmit={() => {
            setDeleteLabelToTask(false);
            fetchTask();
          }}
          taskObject={task!}
        />
      )}
      {addLabelToTask && (
        <AddLabelToTaskForm
          afterSubmit={() => {
            setAddLabelToTask(false);
            fetchTask();
          }}
          taskObject={task!}
        />
      )}
      {showLabel && (
        <ShowLabelForm
          afterSubmit={() => {
            setShowLabel(false);
            fetchTask();
          }}
        />
      )}
      {editTask && (
        <EditTaskForm
          afterSubmit={() => {
            setEditTask(false);
            fetchTask();
          }}
          taskObject={task!}
        />
      )}


      <TrackingList>
        {task?.trackings.map((tracking: Tracking) => (
          <TrackingItem tracking={tracking} fetchTask={fetchTask}></TrackingItem>
        ))}
      </TrackingList>
    </Layout>
  );
};

