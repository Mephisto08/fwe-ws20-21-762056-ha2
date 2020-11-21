import React, {useEffect, useState} from "react";
import {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./components/GlobalStyle";
import {Layout} from "./components/Layout";
import { TaskPage } from "./pages/Dashboard/TaskPage";
import {theme} from "./theme";

export interface TaskResponse {
  data: Data[];
}

export interface Data {
  id:            number;
  name:          string;
  description:   string;
  created:       Date;
  updated:       Date;
  __trackings__: any[];
  __labels__:    any[];
}


export const App = () => {
  
  const [task, setTask] = useState<TaskResponse | null>(null);
  const fetchTasks = async () => { 
    const tasksRequest = await fetch("http://localhost:3000/api/task");
    const tasks = await tasksRequest.json() as TaskResponse;
    console.log(tasks);
    setTask(tasks)
  };
  useEffect(() =>{
    fetchTasks();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
        <Layout>
          <TaskPage/>
        </Layout>
    </ThemeProvider>
  );
};
