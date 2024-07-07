import React, { useCallback } from "react";
import { Timer } from "~/components/base/timer";
import { ActionButton } from "~/components/base/actionButton";
import { submitExamination } from "~/api/endpoints/examinations";


type Props = {
  examination: any;
  children: React.ReactNode;
};

export const TimerScreen: React.FC<Props> = ({ children, examination }) => {
  const { mutate, isLoading: isSubmitting } = submitExamination();

  const submit = useCallback(() => {
    mutate(examination.id);
  }, [examination])

  return (
    <div className="flex flex-col h-screen">
      <div className="">
        <div className="sticky">
          <nav className="bg-gray-800 shadow">
            <div className="px-8 mx-auto max-w-7xl">
              <div className="flex items-center justify-between">
                <div className="w-full justify-between flex flex-col md:flex-row items-center">
                  <div className="my-3">
                    <div className="flex items-baseline text-white">
                      <Timer from={Date.parse(examination.exam_start_dt)} />
                    </div>
                  </div>
                  <div className="my-3">
                    <ActionButton
                      onClick={() => submit()}
                      isLoading={isSubmitting}
                    >
                      Submit
                    </ActionButton>
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
  );
};
