import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";
import {
  Task,
  TaskList,
  TaskItem,
} from "./components/taskList";
import {AddButton} from "../../components/Button";
import {AddTaskForm} from "./components/addTask";
import {Layout} from "../../components/Layout";
import {BottomTaskBar} from "./components/bottomTaskBar";
import {useHistory} from "react-router-dom";

export const TaskPage = () => {
  const [allTask, setTask] = useState<Task[]>([]);
  const [addTask, setAddTask] = useState(false);
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
            <AddButton  onClick= {() => {
              setAddTask(!addTask)
            }}
            
          />
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
        <TaskList>
          {allTask.map((allTask) => (
            <TaskItem onClick={() => (history.push(`/task/${allTask.id}`))} key={allTask.id} task={allTask}></TaskItem>
          ))}
        </TaskList>
    </Layout>
  );
};
