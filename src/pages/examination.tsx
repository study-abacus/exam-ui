import { format } from "date-fns";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { getExamination } from "~/api/endpoints/examinations";
import { Timer } from "~/components/base/timer";
import { Loading } from "~/components/loading";

export const Component: React.FC = () => {
  const { examination_id } = useParams<{ examination_id: string }>();
  const { data: examination, isLoading } = getExamination(
    parseInt(examination_id)
  );

  return (
    <div className="container mx-auto py-4">
      <div className="mx-5 relative flex flex-col mt-6">
        <div className="text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl p-5">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="flex flex-col md:flex-row p-3 items-center">
              <div className="text-center md:text-left basis-3/4">
                <div className="text-3xl">{examination?.name}</div>
                <div className="mt-1 text-gray-500 md:text-md">
                  {examination &&
                    format(
                      Date.parse(examination?.exam_start_dt),
                      "iiii, dd MMMM yyyy"
                    )}
                </div>
              </div>
              <div className="basis-1 mt-3 md:mt-0 basis-1/4 flex flex-row justify-end">
                <Timer
                  to={Date.parse(examination.exam_start_dt)}
                  afterEnds={
                    <Link
                      to={`/examination/${examination.id}/attempt`}
                      type="button"
                      className="py-3 px-4 inline-flex items-center gap-x-2
                                            text-sm font-semibold rounded-lg border
                                            border-transparent bg-blue-600 text-white
                                            hover:bg-blue-700 disabled:opacity-50
                                            disabled:pointer-events-none"
                    >
                      Start Examination
                    </Link>
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
