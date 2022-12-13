import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider, 
  Route,
  Link,
} from "react-router-dom";
import Welcome from './Welcome';


const root = ReactDOM.createRoot(document.getElementById('root'));

const reactRouter = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />
  }
])


root.render(
  <React.StrictMode>
    <RouterProvider router={reactRouter}/>
  </React.StrictMode>
);

