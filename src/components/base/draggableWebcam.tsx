import React, { useRef } from "react";
import Draggable from "react-draggable";
// Assuming you have a Webcam component
import Webcam from "react-webcam"; // Adjust the import path according to your project structure

const DraggableWebcam: React.FC = () => {
  const ref = useRef(null);

  return (
    <div className="fixed right-0 top-0" style={{ zIndex: 10000 }}>
      <Draggable
        nodeRef={ref}
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        >
        <div ref={ref} className="handle cursor-move">
          <Webcam
            audio={false}
            height={100}
            width={100}
            screenshotFormat="image/jpeg"
            className="rounded-lg shadow-lg"
          />
        </div>
      </Draggable>
    </div>
  );
};

export default DraggableWebcam;