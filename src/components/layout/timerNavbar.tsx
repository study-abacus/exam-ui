import React from "react";
import { Timer } from "~/components/base/timer";
import { ActionButton } from "~/components/base/actionButton";

export const TimerNavbar: React.FC = () => {
  return (
    <div className="sticky">
      <nav className="bg-gray-800 shadow">
        <div className="px-8 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="w-full justify-between flex flex-col md:flex-row items-center">
              <div className="my-3">
                <div className="flex items-baseline text-white">
                  <Timer from={new Date().getTime()} />
                </div>
              </div>
              <div className="my-3">
                <ActionButton
                  onClick={() => {}}
                >
                  Submit
                </ActionButton>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
