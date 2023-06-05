import { useEffect, useRef } from "react"
import { lineTemplate } from "./Line"

function Line () {
    const lineRef = useRef(null)
    useEffect(()=>{
        if(lineRef.current!==null){
            lineTemplate(lineRef.current)
        }
       
    },[])
    return (
        <div className="line" >
            <div className="controlBar">

            </div>
            <div className="renderArea" ref={lineRef}>

            </div>
        </div>
    )
}

export default Line