import React from "react";
import { ActiveCompetitions } from "~/components/dashboard/activeCompetitions";
import { AdmitCardLogin } from "~/components/dashboard/admitCardLogin";

export const Component: React.FC = () => {

  return (
    <>
      <div className="bg-gray-800 mb-4">
        <div className="container mx-auto">
          <div className="lg:flex lg:items-center lg:justify-between w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Examination Portal</span>
              <span className="block text-indigo-500">
                for Study Abacus competitions
              </span>
            </h2>
            <AdmitCardLogin />
          </div>
        </div>
      </div>
      <div id="active-competitions">
        <ActiveCompetitions />
      </div>
    </>
  );
};
