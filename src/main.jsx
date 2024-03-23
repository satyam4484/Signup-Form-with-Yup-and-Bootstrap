import React from 'react'
import {createRoot} from 'react-dom/client'
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import "./index.css";
import "./custom.css";

import App from './App.jsx'
const root = createRoot(document.getElementById("root"));

root.render(
  <App/>
)
