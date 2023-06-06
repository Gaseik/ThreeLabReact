import { useEffect, useRef } from "react"
import { changeColor, render } from "./Cube"
import './style/Cube.scss'
function Cube () {
    const cubeRef = useRef(null)
    useEffect(()=>{
        if(cubeRef.current!==null){
            render(cubeRef.current)
        }
       
    },[])
    return (
        <div className="cube" >
            <div className="controlBar">
                <div className="changeColor btn" onClick={changeColor}>
                    Change Color
                </div>
            </div>
            <div className="renderArea" ref={cubeRef}>

            </div>
        </div>
    )
}

export default Cube