import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Task, LabelItem, TrackedTime, LabelList, Label, TaskDescription, msToHMS } from "../Dashboard/components/taskList";
import { Layout } from "../../components/Layout";
import { Tracking, TrackingItem, TrackingList } from "./components/trackingList";
import { AddButton, AddLabelButton, DeleteLabelButton, EditButton, ShowLabelButton } from "../../components/Button";
import { EditTaskForm } from "./components/editTask";
import { AddTrackingForm } from "./components/addTracking";
import { AddLabelToTaskForm } from "./components/addLabelToTask";
import { DeleteLabelToTaskForm } from "./components/deleteLabelFromTask";
import { ShowLabelForm } from "./components/showLabel";


export const TaskPageID = () => {
  const { taskId }: any = useParams();
  const [task, setTask] = useState<Task>();
  const [editTask, setEditTask] = useState(false);
  const [addLabelToTask, setAddLabelToTask] = useState(false);
  const [deleteLabelToTask, setDeleteLabelToTask] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [addTracking, setAddTracking] = useState(false);

  const getDateDifference = function (): string {
    const ms = task?.__trackings__.reduce((prev: any, cur: any) => {
      const timeStart = new Date(cur.timeStart);
      const timeEnd = new Date(cur.timeEnd);
      const diff = (timeEnd.getTime() - timeStart.getTime());
      console.log(diff, timeEnd.getTime(), diff);

      return diff + prev;
    }, 0);

    return msToHMS(ms);
  }


  const fetchTask = async function () {
    const taskRequest = await fetch(`/api/task/${taskId}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    console.log(taskRequest);
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
            setAddTracking(!addTracking);
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
                {task?.__labels__ &&
                  task?.__labels__.map((label: Label) => {
                    return <li key={label.id}>{label.id} {label.name}</li>;
                  })}
              </LabelList>
            </LabelItem>

          </div>
                <TrackedTime>Gesamtdauer des Tasks: {getDateDifference()} Stunden</TrackedTime>
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
        {editTask && (
          <EditTaskForm
            afterSubmit={() => {
              setEditTask(false);
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
        {addLabelToTask && (
          <AddLabelToTaskForm
            afterSubmit={() => {
              setAddLabelToTask(false);
              fetchTask();
            }}
            taskObject={task!}
          />
        )}
        {deleteLabelToTask && (
          <DeleteLabelToTaskForm
            afterSubmit={() => {
              setDeleteLabelToTask(false);
              fetchTask();
            }}
            taskObject={task!}
          />
        )}
        {addTracking && (
          <AddTrackingForm
            afterSubmit={() => {
              setAddTracking(false);
              fetchTask();
            }}
            taskObject={task!}
          />
        )}
        <TrackingList>
          {task?.__trackings__.map((tracking: Tracking) => (
            <TrackingItem tracking={tracking} fetchTask={fetchTask}></TrackingItem>
          ))}
        </TrackingList>
    </Layout>
  );
};

