import React from "react";
import { Timer } from "~/components/base/timer";
import DraggableWebcam from "~/components/base/draggableWebcam";


type Props = {
  examination: any;
  children: React.ReactNode;
};

export const TimerScreen: React.FC<Props> = ({ children, examination }) => {
  return (
    <>
      <DraggableWebcam />
      <div className="flex flex-col h-screen">
        <div className="">
          <div className="sticky">
            <nav className="bg-gray-800 shadow">
              <div className="px-8 mx-auto max-w-7xl">
                <div className="w-full flex flex-row justify-center">
                  <div className="my-3">
                    <div className="flex items-baseline text-white">
                      <Timer from={Date.parse(examination.exam_start_dt)} />
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="grow">
          {children}
        </div>
      </div>
    </>
  );
};
