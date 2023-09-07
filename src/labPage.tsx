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
                {/* <div className="changeColor btn">
                    Change Color
                </div> */}
            </div>
            <div className="renderArea" ref={pageRef}>
                <div className="comming">COMMING SOON</div>
                <div className="controlArea">
                    <div className="btn1 btn">
                        <div className="line"></div>
                    </div>
                    <div className="btn2 btn"></div>
                    <div className="btn3 btn"></div>
                    <div className="btn4 btn"></div>
                </div>
            </div>
        </div>
    )
}

export default LabPage