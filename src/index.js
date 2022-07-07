import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";

import { makeServer } from "./api";
import Main from "./Main";
import reportWebVitals from "./reportWebVitals";
import getStore from "./store/getStore";
import reducers from "./store/reducers";

import "./styles/index.css";

// createServer({
//   routes() {
//     this.get("/api/reminders", () => ({
//       reminders: [
//         { id: 1, text: "Walk the dog" },
//         { id: 2, text: "Take out the trash" },
//         { id: 3, text: "Work out" },
//       ],
//     }));

//     let newId = 4;
//     this.post("/api/reminders", (schema, request) => {
//       let attrs = JSON.parse(request.requestBody);
//       attrs.id = newId++;

//       return { reminder: attrs };
//     });
//   },
// });

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={getStore(reducers)}>
      <Main />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
