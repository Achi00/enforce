import React from "react";
import { createRoot } from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { StateContext } from "context/StateContext";
import { Toaster } from "react-hot-toast";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <StateContext>
      <Toaster />
      <App />
    </StateContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
