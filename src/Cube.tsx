import { useEffect, useRef, useState } from "react";
import { changeColor, changeTexture, modelLoader, render } from "./Cube";
import "./style/Cube.scss";
function Cube() {
  const cubeRef = useRef(null);
  const [model, setModel] = useState(false);
  useEffect(() => {
    if (cubeRef.current !== null) {
      render(cubeRef.current);
    }
  }, []);

  function modelChange() {
    modelLoader(model);
    setModel(!model);
  }
  return (
    <div className="cube">
      <div className="controlBar">
        <div className="changeColor btn" onClick={modelChange}>
          Change Model
        </div>
        <div
          className={!model ? "changeColor btn" : "dnone"}
          onClick={changeColor}
        >
          Change Color
        </div>
        <div
          className={!model ? "changeColor btn" : "dnone"}
          onClick={changeTexture}
        >
          Change Texture
        </div>
      </div>
      <div className="renderArea" ref={cubeRef}></div>
    </div>
  );
}

export default Cube;
