import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { TimerNavbar } from "~/components/layout/timerNavbar";
import { Loading } from "~/components/loading";

export const WithTimer: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="">
        <TimerNavbar />
      </div>
      <div className="grow">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};
