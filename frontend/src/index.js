import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

//This sets up a react root which is used to render react elements into the DOM
ReactDOM.createRoot(document.getElementById("app")).render(
	<BrowserRouter>
		<App/>
	</BrowserRouter>
);
