import React, { useCallback, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getExamination } from "~/api/endpoints/examinations";
import { listQuestions } from "~/api/endpoints/questions";
import { Question } from "~/components/attempt/question";
import { QuestionPill } from "~/components/attempt/questionPills";
import { TimerScreen } from "~/components/attempt/timerScreen";
import { Loading } from "~/components/loading";

export const Component: React.FC = () => {
  const { examination_id } = useParams<{ examination_id: string }>();

  const { data: examination, isLoading: isLoadingExamination } = getExamination(
    parseInt(examination_id)
  );
  const { data: questions, isLoading: isLoadingQuestions } = listQuestions(examination_id);

  const [searchParams, setSearchParams] = useSearchParams();
  const activeQuestionId = searchParams.get("question_id");

  const nextQuestionId = useMemo(() => {
    const currentIndex = questions?.findIndex(
      (question) => question.id === parseInt(activeQuestionId)
    );

    if (!questions || currentIndex >= questions.length) return null

    return questions[currentIndex + 1]?.id
  }, [questions, activeQuestionId])
  const onSaveAndNext = useCallback(() => {
    if (nextQuestionId){
      setSearchParams({ question_id: nextQuestionId })
    }
  }, [nextQuestionId])

  return isLoadingExamination ? <Loading /> : (
    <TimerScreen examination={examination}>
      <div className="container mx-auto py-4">
        <div className="flex flex-col md:flex-row md:gap-4">
          <div className="md:basis-1/2">
            <div className="flex flex-col">
              {!!questions?.length && <Question 
                examination_id={examination_id}
                question_id={activeQuestionId || questions[0].id}
                onAfterSubmit={onSaveAndNext}
              />}
            </div>
          </div>
          <div className="md:basis-1/2 mt-5 md:mt-0">
            <div className="text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl p-5">
              {isLoadingQuestions ? <Loading /> : (
                <div className="flex flex-col divide-y *:py-4 first:*:pt-0 last:*:pb-0">
                  <div className="text-2xl font-bold">Questions ({questions.filter(q => !!q.answer).length}/{questions.length})</div>
                  <div className="grid grid-cols-6 gap-4 justify-items-center">
                    {questions.map((question, index) => (
                      <QuestionPill 
                        key={question.id}
                        index={index + 1}
                        question={question}
                        activeQuestionId={activeQuestionId || questions[0].id}
                        onClick={() => { setSearchParams({ question_id: question.id })}}
                      />
                    ))}
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full border-2 bg-blue-500"></div>
                      Current Question
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full border-2 bg-green-500"></div>
                      Answered
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full border-2 bg-gray-500"></div>
                      Unattempted
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </TimerScreen>
  );
};
