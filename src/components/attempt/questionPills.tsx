import React from "react";

type Props = {
  index: number;
  question: any;
  activeQuestionId: string;
  onClick: () => void;
};

export const QuestionPill: React.FC<Props> = ({
  index,
  question,
  activeQuestionId,
  onClick,
}) => {
  const color = !!question.answer
    ? "bg-green-500"
    : question?.id === parseInt(activeQuestionId)
    ? "bg-blue-500"
    : "bg-gray-500";

  return (
    <button onClick={onClick}>
      <div
        className={`w-10 h-10 rounded-full border-2 border-gray-500 flex justify-center items-center text-white ${color}`}
      >
        <p>{index}</p>
      </div>
    </button>
  );
};
