import { useEffect, useRef, useState } from "react";
import {
  addEnvirment,
  changeColor,
  changeTexture,
  modelLoader,
  render,
  controlMode,
} from "./Cube";
import "./style/Cube.scss";
import * as dat from 'dat.gui';





const options = ["translate", "rotate", "scale"];
const gui = new dat.GUI({name: 'My GUI'});
// var folder1 = gui.addFolder('Flow Field');
var person = {name: 'Sam'};
gui.add(person, 'name');
// gui.add(person, 'Mode');

function Cube() {
  
  const cubeRef = useRef(null);
  const [model, setModel] = useState(false);
  const [control, setControl] = useState(options[0]);
 
  useEffect(() => {
   
  }, []);


  useEffect(() => {
    if (cubeRef.current !== null) {
      render(cubeRef.current);
    }
  }, []);

  function modelChange() {
    modelLoader(model);
    setModel(!model);
  }

  function handelCotrol() {
    let next =
      options.indexOf(control) === options.length - 1
        ? 0
        : options.indexOf(control) + 1;
    setControl(options[next]);
    controlMode(options[next]);
  }
  return (
    <div className="cube">
      
      <div className="controlBar">
        <div className="changeColor btn" onClick={modelChange}>
          Change Model
        </div>
        <div className="changeColor btn" onClick={addEnvirment}>
          Change Env
        </div>
        <div className="changeColor btn" onClick={handelCotrol}>
          {control} mode
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
