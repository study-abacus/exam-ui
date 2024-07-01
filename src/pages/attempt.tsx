import React from "react";
import { QuestionPill } from "~/components/attempt/pills";

export const Component: React.FC = () => {
  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="text-xl font-bold md:basis-1/2">
          <div className="flex flex-col">
            Question Title
            <textarea
              id="message"
              rows={4}
              className="mt-3 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>
        </div>
        <div className="md:basis-1/2 mt-5 md:mt-0">
          <div className="text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl p-5">
            <div className="text-2xl font-bold mb-4">Questions (0/80)</div>
            <div className="grid grid-cols-6 gap-4 justify-items-center ">
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
              <QuestionPill />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
