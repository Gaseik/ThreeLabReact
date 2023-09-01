import { useEffect, useRef } from "react"
import { pageTemplate } from "./labPage"

function LabPage () {
    const pageRef = useRef(null)
    useEffect(()=>{
        if(pageRef.current!==null){
            pageTemplate(pageRef.current)
        }
    },[])
    return (
        <div className="line" >
            <div className="controlBar">
                <div className="changeColor btn">
                    Change Color
                </div>
            </div>
            <div className="renderArea" ref={pageRef}>

            </div>
        </div>
    )
}

export default LabPage