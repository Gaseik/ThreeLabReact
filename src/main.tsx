import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './index.scss'
import {
  createBrowserRouter,
  RouterProvider,
  Link
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/cube",
    element: <App/>,
  },
  {
    path: "/line",
    element: <App/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div>
      <div className='header'>
        <Link to="/cube" className='navBtn'>CUBE</Link>
        <Link to="/line" className='navBtn'>LINE</Link>
      </div>
      <RouterProvider router={router} />
    </div>
    
  </React.StrictMode>,
)
