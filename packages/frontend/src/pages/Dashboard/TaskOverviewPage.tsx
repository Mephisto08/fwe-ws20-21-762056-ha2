import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import {
  Task,
  TaskList,
  TaskItem,
} from "./components/taskList";
import { AddButton, AddLabelButton, FilterButton } from "../../components/Button";
import { AddTaskForm } from "./components/addTask";
import { Layout } from "../../components/Layout";
import { useHistory } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { AddLabelForm } from "./components/addLabel";
import { FilterForm } from "./components/filter";

export const TaskPage = () => {
  const [allTask, setTask] = useState<Task[]>([]);
  const [addTask, setAddTask] = useState(false);
  const [addLabel, setAddLabel] = useState(false);
  const [taskFilter, setTaskFilter] = useState({ taskName: "", taskDescription: "", taskLabel: ""});
  const [filter, setFilter] = useState(false);
  let history = useHistory();

  const fetchTask = async function () {
    const taskRequest = await fetch(
      `/api/task?filterTask=${taskFilter.taskName}&filterDescription=${taskFilter.taskDescription}&filterLabel=${taskFilter.taskLabel}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    console.log(taskRequest);
    if (taskRequest.status === 200) {
      const transactionJSON = await taskRequest.json();
      setTask(transactionJSON.data);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskFilter]);


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

          <FilterButton onClick={() => {
            setFilter(!filter);
          }} />
          <AddLabelButton onClick={() => {
            setAddLabel(!addLabel);
          }} />
          <AddButton onClick={() => {
            setAddTask(!addTask);
          }} />
        </div>
      </div>
      {addTask && (<Modal
        title="Erstelle einen Task!"
        onCancel={() => {
          setAddTask(false);
        }}>
        <AddTaskForm
          afterSubmit={() => {
            setAddTask(false);
            fetchTask();
          }}
        />
      </Modal>
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
      {filter && (<Modal
        title="Filter"
        onCancel={() => {
          setFilter(false);
        }}>
        <FilterForm
          afterSubmit={() => {
            setFilter(false);
            fetchTask();
          }}
          taskFilter={taskFilter}
          setTaskFilter={setTaskFilter}
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
