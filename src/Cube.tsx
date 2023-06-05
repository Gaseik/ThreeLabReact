import { useEffect, useRef } from "react"
import { render } from "./Cube"

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

            </div>
            <div className="renderArea" ref={cubeRef}>

            </div>
        </div>
    )
}

export default Cube