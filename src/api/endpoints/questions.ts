import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { client } from "~/api/client";

export const listQuestions = (examinationId: string) => {
  const navigate = useNavigate();

  return useQuery(["questions", examinationId], async () => {
    const response = await client.get("api/v1/questions/", {
      params: { examination_id: examinationId },
    });
    return response.data;
  }, {
    onError(err: AxiosError<any>) {
      if (["ExaminationNotStarted", "ExamSubmitted"].includes(err?.response?.data?.app_exception)) {
        navigate(`/examination/${examinationId}`);
      }
    },
  });
}

export const getQuestion = (examinationId: string, questionId: string) => {
  const navigate = useNavigate();

  return useQuery(["questions", examinationId, questionId], async () => {
    const response = await client.get(`api/v1/questions/${questionId}`, {
      params: { examination_id: examinationId },
    });
    return response.data;
  }, {
    onError(err: AxiosError<any>) {
      if (["ExaminationNotStarted", "ExamSubmitted"].includes(err?.response?.data?.app_exception)) {
        navigate(`/examination/${examinationId}`);
      }
    }
  });
}

export type AnswerQuestionParams = {
  answer: string;
};
export const answerQuestion = (examinationId: string, questionId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
      queryClient.invalidateQueries(["questions", examinationId]);
      queryClient.invalidateQueries(["questions", examinationId, questionId]);
    },
    onError(err: AxiosError<any>) {
      if (["ExaminationNotStarted", "ExamSubmitted"].includes(err?.response?.data?.app_exception)) {
        navigate(`/examination/${examinationId}`);
      }
    },
  });
};
