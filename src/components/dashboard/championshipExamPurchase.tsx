import React, { useCallback } from 'react'
import Select from 'react-select'
import { useMutation } from 'react-query'
import { listExaminations } from '~/api/endpoints/examinations'
import { getOrderPrice, createOrder, captureOrder } from '~/api/endpoints/orders'
import { Loading } from '~/components/loading'
import { ActionButton } from '~/components/base/actionButton'
import Popup from 'reactjs-popup'
import { AxiosError } from 'axios'


type Props = {
    competition: any
}

export const ChampionshipExamPurchase: React.FC<Props> = ({ competition }) => {
    const [selectedExams, setSelectedExams] = React.useState([])
    const [admitCard, setAdmitCard] = React.useState(null)
    const [modalOpen, setModalOpen] = React.useState(false)


    const { data: examinations = [], isLoading: loadingExaminations } = listExaminations(competition.id)
    
    const { data: order, isLoading: loadingPrice } = getOrderPrice(competition.id, selectedExams.map((exam: any) => exam.value))
    const { mutateAsync: createOrderMutation } = createOrder()
    const { mutateAsync: captureOrderMutation } = captureOrder()

    const { mutate: payNowMutation, isLoading: payNowRunning , isError, error} = useMutation<any,AxiosError<any>>({
        mutationFn: useCallback(async () => {
            const result = await createOrderMutation({
                championshipId: competition.id,
                examinationIds: selectedExams.map((exam: any) => exam.value)
            })
            const razpResult: any = await new Promise((resolve, reject) => {
                const options = {
                    "key": "rzp_test_q818zEKBeaYNS9", 
                    "amount": result.amount,
                    "currency": "INR",
                    "name": "Study Abacus", 
                    "description": "Test Transaction",
                    "image": "https://studyabacus.com/admin/assets/images/logo/1684778226Abacus.png",
                    "order_id": result.order_id,
                    "handler": response => {
                        resolve(response)
                    },
                    "notes": {
                        "address": "Razorpay Corporate Office"
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };

                // @ts-ignore
                const rzp = new Razorpay(options);
                rzp.on('error', (error) => {
                    reject(error)
                })
                rzp.on('payment.failed', (response) => {
                    reject(response.error)
                });
                rzp.open();
            })

            const captureOrderRes = await captureOrderMutation({
                orderId: result.order_id,
                paymentId: razpResult.razorpay_payment_id,
                signature: razpResult.razorpay_signature
            })
            setAdmitCard(captureOrderRes)
            setModalOpen(true)
        }, [competition, selectedExams])

    })

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
                                <label htmlFor="countries" className="block mb-2 font-medium text-gray-900">Select Examinations</label>
                                <Select
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    isMulti
                                    value={selectedExams}
                                    onChange={(selectedExams: any) => setSelectedExams(selectedExams)}
                                    options={examinations.map((examination: any) => ({ value: examination.id, label: examination.name }))}
                                />
                            </form>
                        </div>
                        <div className="mx-5 relative flex flex-col mt-6 md:basis-1/2">
                            <div className="text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl p-5">
                                <div className="text-center">
                                    {selectedExams.length > 0 ? (
                                        <div className="flex flex-box justify-between items-center">
                                            <div className="text-3xl">
                                                ₹ {order?.amount}

                                            </div>
                                            <div >
                                            <div>
                                                {
                                                    loadingPrice ? (
                                                        <Loading />
                                                    ) : (
                                                        <ActionButton
                                                            onClick={() => payNowMutation()}
                                                            isLoading={payNowRunning}
                                                        >
                                                            Pay Now
                                                        </ActionButton>
                                                    )

                                                }
                                            </div>  
                                            {isError && <div className="text-red-500 mt-3 text-sm">

                                                {error?.response?.data?.context?.ERROR || "Payment Failed. Please try Again later" }
                                            </div>
                                            }
                                            </div>
                                           
                                        </div>
                                    ) : (
                                        <>
                                            No Exam selected
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Popup modal open={modalOpen} onClose={() => setModalOpen(false)} closeOnDocumentClick>
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
                        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800" onClick={() => setModalOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="text-2xl font-bold text-center mb-4">
                            ADMIT CARD
                        </div>
                        <div className="text-center mb-4">
                            Please take a screenshot of your roll number and password.
                        </div>
                        <div className="text-center mb-4">
                            <table className="table-auto w-full border-collapse">
                                <tbody>
                                    <tr className="border-b">
                                        <td className="px-4 py-2 font-semibold">Roll Number</td>
                                        <td className="px-4 py-2">{admitCard?.id}</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 font-semibold">Password</td>
                                        <td className="px-4 py-2">{admitCard?.password}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}

