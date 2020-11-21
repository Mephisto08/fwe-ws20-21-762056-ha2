import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import {
  Task,
  TaskList,
  TaskItem,
} from "./components/taskList";
import {AddButton} from "./components/button";
const CurrentBalance = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.secondaryFontColor};
`;

export const TaskPage = () => {
  const [tasks, setTask] = useState<Task[]>([]);

  useEffect(() => {
    (async function () {
      const taskRequest = await fetch("/api/task", {
        headers: { "content-type": "application/json" },
      });
    console.log(taskRequest);
    if (taskRequest.status === 200) {
      const taskJSON = await taskRequest.json();
      setTask(taskJSON.data);
    }
    })();
  }, []);

  return (
    <div>
      <div
        css={`
          display: flex;
          flex-direction: row;
          width: 100%;
        `}
      >
        <div>
          <h2>Task</h2>
        </div>
        <div
          css={`
            flex: 1;
            justify-content: flex-end;
            display: flex;
            align-items: top;
          `}
        >
          <AddButton />
        </div>
      </div>
      <TaskList>
        {tasks.map((task) => (
          <TaskItem task={task}></TaskItem>
        ))}
      </TaskList>
    </div>
  );
};
