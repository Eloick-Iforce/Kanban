import React from "react";
import ReactDOM from "react-dom/client";
import "./output.css";
import { Kanban } from "./Kanban";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Kanban />
  </React.StrictMode>
);
