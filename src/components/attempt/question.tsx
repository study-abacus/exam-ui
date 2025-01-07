import React, { useCallback, useEffect } from "react";
import { answerQuestion, getQuestion } from "~/api/endpoints/questions";
import { Loading } from "~/components/loading";
import { ActionButton } from "../base/actionButton";

type Props = {
  examination_id: string;
  question_id: string;
  submitText?: string;
  onAfterSubmit: () => void;
};

export const Question: React.FC<Props> = ({ examination_id, question_id, submitText, onAfterSubmit }) => {
  const [answer, setAnswer] = React.useState("");

  const { data: question, isLoading } = getQuestion(
    examination_id,
    question_id
  );
  const { mutate, isLoading: isUpdatingAnswer } = answerQuestion(
    examination_id,
    question_id
  );

  const saveAnswer = useCallback(() => {
    mutate({ answer }, {
      onSuccess: () => {
        onAfterSubmit()
      }
    });
  }, [answer]);

  useEffect(() => {
    setAnswer(question?.answer || "");
  }, [question]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="text-xl font-bold">
      <div className="text-3xl">
        {question.title}
      </div>
      {question.questype === "number" ? (
        <input
          type="number"
          id="message"
          value={answer}
          className="mt-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          onChange={(e) => setAnswer(e.target.value)} />
      ) : (
        <textarea
          id="message"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={4}
          className="mt-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Write your answer here..."
        ></textarea>
      )}
      <div className="mt-4 flex flex-row justify-end">
        <ActionButton onClick={saveAnswer} isLoading={isUpdatingAnswer}>
          {submitText || "Save & Next"}
        </ActionButton>
      </div>
    </div>
  );
};
