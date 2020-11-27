import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";
import {
  Task,
  TaskList,
  TaskItem,
} from "./components/taskList";
import {AddButton, AddLabelButton} from "../../components/Button";
import {AddTaskForm} from "./components/addTask";
import {Layout} from "../../components/Layout";
import {useHistory} from "react-router-dom";
import { Modal } from "../../components/Modal";
import { AddLabelForm } from "./components/addLabel";

export const TaskPage = () => {
  const [allTask, setTask] = useState<Task[]>([]);
  const [addTask, setAddTask] = useState(false);
  const [addLabel, setAddLabel] = useState(false);
  let history = useHistory();

  const fetchTask = async function () {
    const taskRequest = await fetch("/api/task", {
      method: "GET",
      headers: { "content-type": "application/json"},
    });
    console.log(taskRequest);
    if (taskRequest.status === 200) {
      const transactionJSON = await taskRequest.json();
      setTask(transactionJSON.data);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);


  return (
    <Layout>
        <div
          css={`
            display: flex;
            flex-direction: row;
            width: 100%;
          `}
        >
          <div>
            <h2>Tasks</h2>
          </div>
          <div
            css={`
              flex: 1;
              justify-content: flex-end;
              display: flex;
              align-items: top;
            `}
          >

            <AddLabelButton onClick={() => {
              setAddLabel(!addLabel);
            }}/>
            <AddButton  onClick= {() => {
              setAddTask(!addTask);
            }}/>
          </div>
        </div>
        {addTask && (
          <AddTaskForm
            afterSubmit={() => {
              setAddTask(false);
              fetchTask();
            }}
          />
        )}
         {addLabel && (<Modal
            title="Erstelle ein Label!"
            onCancel={() => {
                setAddLabel(false);
            }}>
            <AddLabelForm
              afterSubmit={() => {
              setAddLabel(false);
              fetchTask();
            }}
          />

        </Modal>
         )}
        <TaskList>
          {allTask.map((allTask) => (
            <TaskItem onClick={() => (history.push(`/task/${allTask.id}`))} 
              key={allTask.id} task={allTask} fetchTask={fetchTask}>
            </TaskItem>
          ))}
        </TaskList>
    </Layout>
  );
};
