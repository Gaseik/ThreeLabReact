import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div className="header">
        <Link to="/cube" className="navBtn">
          CUBE
        </Link>
        <Link to="/line" className="navBtn">
          LINE
        </Link>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
