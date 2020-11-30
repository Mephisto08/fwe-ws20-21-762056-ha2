/**
 * Root Seite der Website
 * Vin hier aus werden die Routen ausgeführt.
 */
import React, {useEffect, useState} from "react";
import {ThemeProvider} from "styled-components";
import {GlobalStyle} from "./components/GlobalStyle";
import {theme} from "./theme";
import {
  BrowserRouter,
  Route,
} from "react-router-dom";
import {TaskOverviewPage} from "./pages/Dashboard/TaskOverviewPage";
import {TaskPageID} from "./pages/TaskDetailPage/taskPage";



export interface TaskResponse {
  data: Data[];
}

export interface Data {
  id:            number;
  name:          string;
  description:   string;
  created:       Date;
  updated:       Date;
  trackings: any[];
  labels:    any[];
}


export const App = () => {
  
  const [task, setTask] = useState<TaskResponse | null>(null);
  const fetchTasks = async () => { 
    const tasksRequest = await fetch("http://localhost:3000/api/task");
    const tasks = await tasksRequest.json() as TaskResponse;
    setTask(tasks)
  };
  useEffect(() =>{
    fetchTasks();
  }, []);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Route exact path="/" component={TaskOverviewPage}/>
        <Route exact path="/task/:taskId" component={TaskPageID}/>
      </ThemeProvider>
    </BrowserRouter>

  );
};
