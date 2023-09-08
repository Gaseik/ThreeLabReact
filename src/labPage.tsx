import { useEffect, useRef, useState } from "react";
import { pageTemplate, moveCam } from "./labPage";

function LabPage() {
  const pageRef = useRef(null);
  const [position, setPosition] = useState(0);
  useEffect(() => {
    if (pageRef.current !== null) {
      pageTemplate(pageRef.current);
    }
  }, []);
  return (
    <div className="line">
      <div className="controlBar">
        {/* <div className="changeColor btn">
                     Change Color
                </div> */}
      </div>
      <div className="renderArea" ref={pageRef}>
        <div
          className="comming"
          onClick={() => {
            moveCam(0, 0, 5);
            setPosition(0);
          }}
        >
          COMMING SOON
        </div>
        <div className="controlArea">
          <div
            className="btn1 btn"
            onClick={() => {
              moveCam(2, 2, 2);
              setPosition(1);
            }}
          >
            <div className="line"></div>
          </div>
          {/* <div className="btn2 btn">
            
          </div>
          <div className="btn3 btn"></div>
          <div className="btn4 btn"></div> */}
        </div>
      </div>
    </div>
  );
}

export default LabPage;
