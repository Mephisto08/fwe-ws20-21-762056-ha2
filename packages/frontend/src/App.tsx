import React, { useEffect } from "react";

/*
enum MessageType {
  INFO = "info",
  ERROR = "error",
  NONE = "",
}

const Message: React.FC<{
  type?: MessageType;
}> = ({ children, type = MessageType.NONE }) => {
  return <div className={`message ${type}`}>{children}</div>;
};

export const App = () => (
  <div className="container">
    <Message type={MessageType.INFO}>Hallo RAMONIUS ich GRÜßE DICH</Message>
  </div>
);*/

export const App = () => {
  
  useEffect(() => {
    (
    async function (){
    const tasksRequest = await fetch("http://localhost:3000/api/task");
    const tasks = await tasksRequest.json();
    console.log(tasks);
    })();
  });
  
  return <div className="container">Hello World!</div>
}
