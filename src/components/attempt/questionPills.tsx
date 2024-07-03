import React from "react";


type Props = {
  index: number;
  onClick: () => void;
}

export const QuestionPill: React.FC<Props> = ({ index, onClick }) => {
  return (
    <button
      onClick={onClick}
    >
      <div className="w-10 h-10 rounded-full border-2 border-gray-500 bg-gray-600 flex justify-center items-center text-white">
        <p>{index}</p>
      </div>
    </button>
  );
};
