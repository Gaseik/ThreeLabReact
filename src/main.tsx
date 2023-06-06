import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './_index.scss'
import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";
import "./index.css";
import Cube from './Cube.tsx'
import LIne from './Line.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/cube",
        element: <Cube/>,
      },
      {
        path: "/line",
        element: <LIne/>,
      },
    ]
  },
 
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
