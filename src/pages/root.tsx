import React from "react";
import { Link } from "react-router-dom";
import { ActiveCompetitions } from "~/components/dashboard/activeCompetitions";
import { AdmitCardLogin } from "~/components/dashboard/admitCardLogin";
import { useAuth } from "~/hooks/useAuth";

export const Component: React.FC = () => {

  const { isAuthenticated } = useAuth()

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
            {isAuthenticated ? (
              <div className="inline-flex justify-end">
                <Link className="py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 " to="/admit_card">
                  Get Started
                </Link>
              </div>
            ) : (<AdmitCardLogin />)}

          </div>
        </div>
      </div>
      <div id="active-competitions">
        <ActiveCompetitions />
      </div>
    </>
  );
};
