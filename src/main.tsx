import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './_index.scss'
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Link
} from "react-router-dom";
import "./index.css";
import Cube from './Cube.tsx'
import LIne from './Line.tsx'
import LabPage from './labPage.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <Cube/>,
      },
      {
        path: "/cube",
        element: <Cube/>,
      },
      {
        path: "/line",
        element: <LIne/>,
      },
      {
        path: "/lab",
        element: <LabPage/>,
      },
    ]
  },
 
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 
    <RouterProvider router={router} />
 
)
