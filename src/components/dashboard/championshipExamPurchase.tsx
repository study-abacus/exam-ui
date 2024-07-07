import React, { useCallback } from "react";
import Select from "react-select";
import { useMutation } from "react-query";
import { listExaminations } from "~/api/endpoints/examinations";
import {
  getOrderPrice,
  createOrder,
  captureOrder,
} from "~/api/endpoints/ordersV2";
import { Loading } from "~/components/loading";
import { ActionButton } from "~/components/base/actionButton";
import { OrderProfileEditor } from "~/components/dashboard/orderProfileEditor";
import { AdmitCard } from "~/components/dashboard/admitCard";
import { Modal } from "~/components/base/modal";
import { AxiosError } from "axios";
import { getChampionship } from "~/api/endpoints/championships";
import { useAuth } from "~/hooks/useAuth";
import { load } from "@cashfreepayments/cashfree-js";

type Props = {
  competition: any;
};

export const ChampionshipExamPurchase: React.FC<Props> = ({ competition }) => {
  const [orderProfile, setOrderProfile] = React.useState({
    name: "",
    email: "",
    phone: "",
    country_code: "91",
  });
  const [selectedExams, setSelectedExams] = React.useState([]);
  const [admitCard, setAdmitCard] = React.useState(null);
  const [admitCardModalOpen, setAdmitCardModalOpen] = React.useState(false);
  const [orderProfileModalOpen, setOrderProfileModalOpen] =
    React.useState(false);

  const { isAuthenticated } = useAuth();
  const { data: examinations = [], isLoading: loadingExaminations } =
    listExaminations(competition.id);
  const { data: championship } = getChampionship(competition.id);

  const { data: order, isLoading: loadingPrice } = getOrderPrice(
    competition.id,
    selectedExams.map((exam: any) => exam.value)
  );
  const { mutateAsync: createOrderMutation } = createOrder();
  const { mutateAsync: captureOrderMutation } = captureOrder();

  const {
    mutate: payNowMutation,
    isLoading: payNowRunning,
    isError,
    error,
  } = useMutation<any, AxiosError<any>>({
    mutationFn: useCallback(async () => {
      const result = await createOrderMutation({
        championshipId: competition.id,
        examinationIds: selectedExams.map((exam: any) => exam.value),
        name: orderProfile.name,
        phone: orderProfile.phone,
        email: orderProfile.email,
        country_code: orderProfile.country_code,
      });
      const cashfree = await load({
        mode: "production",
      });
      await new Promise((resolve, reject) => {
        const checkoutOptions = {
          paymentSessionId: result.payment_session_id,
          redirectTarget: "_modal",
        };
        cashfree.checkout(checkoutOptions).then((result) => {
          if (result.error) {
            // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
            reject(result.error);
          }
          if (result.redirect) {
            console.log("Payment will be redirected");
          }
          if (result.paymentDetails) {
            resolve(result.paymentDetails);
          }
        });
      });

      const captureOrderRes = await captureOrderMutation({
        orderId: result.order_id
      });
      setOrderProfileModalOpen(false)
      setSelectedExams([])
      setAdmitCard(captureOrderRes);
      setAdmitCardModalOpen(true);
    }, [competition, selectedExams, orderProfile]),
  });

  return (
    <>
      <div className="flex flex-col md:flex-row mt-4">
        {loadingExaminations ? (
          <div className="justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="md:basis-1/2">
              <form className="max-w-sm mx-auto">
                <label
                  htmlFor="countries"
                  className="block mb-2 font-medium text-gray-900"
                >
                  Select Examinations
                </label>
                <Select
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  isMulti
                  value={selectedExams}
                  onChange={(selectedExams: any) =>
                    setSelectedExams(selectedExams)
                  }
                  isOptionDisabled={() =>
                    selectedExams.length >= championship?.max_exams ||
                    isAuthenticated
                  }
                  options={examinations.map((examination: any) => ({
                    value: examination.id,
                    label: examination.name,
                  }))}
                />
              </form>
            </div>
            <div className="mx-5 relative flex flex-col mt-6 md:basis-1/2">
              <div className="text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl p-5">
                <div className="text-center">
                  {selectedExams.length > 0 ? (
                    <div className="flex flex-box justify-between items-center">
                      <div className="text-3xl">₹ {order?.amount}</div>
                      <div>
                        <div>
                          {loadingPrice ? (
                            <Loading />
                          ) : (
                            <ActionButton
                              onClick={() => setOrderProfileModalOpen(true)}
                            >
                              Pay Now
                            </ActionButton>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>No Exam selected</>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Modal
        open={orderProfileModalOpen}
        onClose={() => setOrderProfileModalOpen(false)}
        >
        <div className="container mx-auto max-w-md flex flex-col">
          <OrderProfileEditor value={orderProfile} onChange={setOrderProfile} />
          <div className="flex flex-col items-end">
            <ActionButton
              onClick={() => payNowMutation()}
              isLoading={payNowRunning}
            >
              Proceed
            </ActionButton>
            {isError && (
              <div className="text-red-500 mt-3 text-sm">
                {error?.response?.data?.context?.ERROR ||
                  "Payment Failed. Please try again later"}
              </div>
            )}
          </div>
        </div>
      </Modal>
      <Modal
        open={admitCardModalOpen}
        onClose={() => setAdmitCardModalOpen(false)} >
        <AdmitCard 
          admitCard={admitCard}
        />
      </Modal>
    </>
  );
};
