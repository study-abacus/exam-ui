import { format } from "date-fns";
import React from "react";
import { getExamination } from "~/api/endpoints/examinations";
import { Loading } from "../loading";
import { Link } from "react-router-dom";


type Props = {
    examination_id :number,
}

export const ExaminationRow: React.FC<Props> = ({
    examination_id 

}) => {
    const {data: examination, isLoading} = getExamination(examination_id)
    
    return (
       <>
       {
        isLoading ? (
            <Loading/>
        ) : (
            <div className="bg-white rounded-xl divide-y text-gray-900 divide-gray-200 mt-5">
            <div className="flex flex-row p-3 justify-between">
                <div>
                    <div className="text-lg font-semibold">{examination?.name}</div>
                    <div className="mt-1 text-gray-500 md:text-md">{examination && format(Date.parse(examination?.exam_start_dt), 'iiii, dd MMMM yyyy')}</div>
                </div>
                <div className="flex justify-end items-center">
                    <div>
                        <Link
                            to={`/examination/${examination?.id}`}
                            type="button"
                            className="py-3 px-4 inline-flex items-center gap-x-2
                                            text-sm font-semibold rounded-lg border
                                            border-transparent bg-blue-600 text-white
                                            hover:bg-blue-700 disabled:opacity-50
                                            disabled:pointer-events-none">
                            View
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        )
       }
       </>
    )
}