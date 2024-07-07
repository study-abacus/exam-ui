import React, { useCallback } from 'react';
import { Modal } from '~/components/base/modal';
import { ActionButton } from '~/components/base/actionButton';
import { submitExamination } from '~/api/endpoints/examinations';


type Props = {
  examination: any
  questions: any[]
  open: boolean
  onClose: () => void
}
export const SubmitModal: React.FC<Props> = ({ examination, questions, open, onClose }) => {
  const { mutate, isLoading: isSubmitting } = submitExamination();
  const hasAttemptedAllQuestions = questions?.filter(q => !q.answer).length == 0

  const submit = useCallback(() => {
    mutate(examination.id);
  }, [examination])

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="font-bold">
          Are you sure you want to submit the examination?
        </div>

        {!hasAttemptedAllQuestions && <div className="text-red-500">
          Please attempt all questions before submitting.
        </div>}

        <div>
          <ActionButton
            onClick={() => submit()}
            isLoading={isSubmitting}
            disabled={!hasAttemptedAllQuestions}
          >
            Submit
          </ActionButton>
        </div>
      </div>
    </Modal>
  );
};
