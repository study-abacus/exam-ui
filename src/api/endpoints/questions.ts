import { useMutation, useQuery, useQueryClient } from "react-query";
import { client } from "~/api/client";

export const listQuestions = (examinationId: string) =>
  useQuery(["questions", examinationId], async () => {
    const response = await client.get("api/v1/questions/", {
      params: { examination_id: examinationId },
    });
    return response.data;
  });

export const getQuestion = (examinationId: string, questionId: string) =>
  useQuery(["questions", examinationId, questionId], async () => {
    const response = await client.get(`api/v1/questions/${questionId}/`, {
      params: { examination_id: examinationId },
    });
    return response.data;
  });

export type AnswerQuestionParams = {
  answer: string;
};
export const answerQuestion = (examinationId: string, questionId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AnswerQuestionParams) => {
      const response = await client.put(
        `api/v1/questions/${questionId}/`,
        { answer: data.answer },
        {
          params: { examination_id: examinationId },
        }
      );
      return response.data;
    },
    onSuccess() {
      queryClient.invalidateQueries(["questions", examinationId, questionId]);
    },
  });
};
