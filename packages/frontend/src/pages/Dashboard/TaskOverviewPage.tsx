/**
 * Dies ist die Startseite der Anwendung. Auf dieser Seite werden alle Task angezeigt.
 * Ebenso können auf dieser Seite Task erstellt werden auf dem + Button.
 * Es können Labels erstellt weden und es kann ein Filter auf die Task angewendet werden.
 * Man kann nach Task Description, Label von Task und Task Namen filtern.
 */
import React, {useEffect, useState} from "react";
// Dieser Import wird zwar nicht angezeigt als nicht benötigt,
// jedoch verändert sich das Layout, wenn der Import entfernt wird.
// Deswegen bleubt er erhalten.
import styled from "styled-components/macro";
import {
  Task,
  TaskList,
  TaskItem,
} from "./components/taskList";
import {
  AddButton,
  CreateLabelButton,
  FilterButton,
} from "../../components/Button";
import {CreateTaskForm} from "./components/createTask";
import {Layout} from "../../components/Layout";
import {useHistory} from "react-router-dom";
import {Modal} from "../../components/Modal";
import {CreateLabelForm} from "./components/createLabel";
import {FilterForm} from "./components/filter";


export const TaskOverviewPage = () => {
  const [allTask, setTask] = useState<Task[]>([]);
  const [addTask, setAddTask] = useState(false);
  const [addLabel, setAddLabel] = useState(false);
  const [taskFilter, setTaskFilter] = useState({ taskName: "", taskDescription: "", taskLabel: "" });
  const [filter, setFilter] = useState(false);
  const [taskTrackingId, setTaskTrackingId] = useState(-1);
  let history = useHistory();

  /**
   * Es werden alle Task geladen. Dabei werden auch die Filter mitgesendet.
   * Wenn diese nicht gesetzt wurden durch den Anwender, werden sie als leere Strings mitgeschickt.
   * Dies hat somit keine Ausiwrkunng auff den fetch.
   */
  const fetchTask = async function () {
    const taskRequest = await fetch(
      `/api/task?filterTask=${taskFilter.taskName}&filterDescription=${taskFilter.taskDescription}&filterLabel=${taskFilter.taskLabel}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
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
          <h1>Tasks</h1>
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
          <CreateLabelButton onClick={() => {
            setAddLabel(!addLabel);
          }} />
          <AddButton onClick={() => {
            setAddTask(!addTask);
          }} />
        </div>
      </div>
      {filter && (<Modal
        title="Filtern"
        onCancel={() => {
          setFilter(false);
        }}>
        <FilterForm
          afterSubmit={() => {
            setFilter(false);
            fetchTask();
          }}
          setTaskFilter={setTaskFilter}
        />
      </Modal>
      )}
      {addLabel && (<Modal
        title="Label erstellen"
        onCancel={() => {
          setAddLabel(false);
        }}>
        <CreateLabelForm
          afterSubmit={() => {
            setAddLabel(false);
            fetchTask();
          }}
        />
      </Modal>
      )}
      {addTask && (<Modal
        title="Task erstellen"
        onCancel={() => {
          setAddTask(false);
        }}>
        <CreateTaskForm
          afterSubmit={() => {
            setAddTask(false);
            fetchTask();
          }}
        />
      </Modal>
      )}
      <TaskList>
        {allTask.map((allTask) => (
          <TaskItem onClick={() => (history.push(`/task/${allTask.id}`))}
            key={allTask.id} task={allTask} fetchTask={fetchTask} taskTrackingId={taskTrackingId} setTaskTrackingId={setTaskTrackingId}>
          </TaskItem>
        ))}
      </TaskList>
    </Layout>
  );
};
