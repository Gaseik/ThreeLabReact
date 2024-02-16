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
import Stats from 'stats.js'; // 引入 stats.js 库





const options = ["translate", "rotate", "scale"];
const gui = new dat.GUI({name: 'My GUI'});
// var folder1 = gui.addFolder('Flow Field');
var person = {name: 'Sam'};
gui.add(person, 'name');
const fpsMonitor = { fps: 0 }; // 创建一个对象来存储 FPS
gui.add(fpsMonitor, 'fps', 0, 1000); // 向 'Stats' 文件夹添加 FPS 监视器

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
      // const stats = new Stats();
      // stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
      // document.body.appendChild(stats.dom);
      
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
      <div className="renderArea" ref={cubeRef}></div>
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
    
    </div>
  );
}

export default Cube;
