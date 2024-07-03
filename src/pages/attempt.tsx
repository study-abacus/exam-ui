import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getExamination } from "~/api/endpoints/examinations";
import { listQuestions } from "~/api/endpoints/questions";
import { Question } from "~/components/attempt/question";
import { QuestionPill } from "~/components/attempt/questionPills";
import { TimerScreen } from "~/components/attempt/timerScreen";
import { Loading } from "~/components/loading";

export const Component: React.FC = () => {
  const { examination_id } = useParams<{ examination_id: string }>();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeQuestionId = searchParams.get("question_id");

  const { data: examination, isLoading: isLoadingExamination } = getExamination(
    parseInt(examination_id)
  );
  const { data: questions, isLoading: isLoadingQuestions } = listQuestions(examination_id);

  return isLoadingExamination ? <Loading /> : (
    <TimerScreen examination={examination}>
      <div className="container mx-auto py-4">
        <div className="flex flex-col md:flex-row md:gap-4">
          <div className="md:basis-1/2">
            <div className="flex flex-col">
              {questions && <Question 
                examination_id={examination_id}
                question_id={activeQuestionId || questions[0].id}
              />}
            </div>
          </div>
          <div className="md:basis-1/2 mt-5 md:mt-0">
            <div className="text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl p-5">
              {isLoadingQuestions ? <Loading /> : (
                <>
                  <div className="text-2xl font-bold mb-4">Questions (0/{questions.length})</div>
                  <div className="grid grid-cols-6 gap-4 justify-items-center">
                    {questions.map((question, index) => (
                      <QuestionPill 
                        index={index + 1}
                        onClick={() => { setSearchParams({ question_id: question.id })}}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </TimerScreen>
  );
};
