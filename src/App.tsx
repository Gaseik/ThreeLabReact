
import { Outlet } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";

function App() {

  return (
    <div>
      <div className="header">
        <Link to="/cube" className="navBtn">
          CUBE
        </Link>
     
        <Link to="/Lab" className="navBtn">
          皮爸
        </Link>
      </div>
      <div>
        <Outlet/>
      </div>
    </div>
  );
}

export default App;
