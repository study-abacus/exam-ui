import React, { ChangeEvent, useCallback } from 'react'
import Select from 'react-select'
import { useMutation } from 'react-query'
import { listExaminations } from '~/api/endpoints/examinations'
import { getOrderPrice, createOrder, captureOrder } from '~/api/endpoints/ordersV2'
import { Loading } from '~/components/loading'
import { ActionButton } from '~/components/base/actionButton'
import Popup from 'reactjs-popup'
import { AxiosError } from 'axios'
import { getChampionship } from '~/api/endpoints/championships'
import { useAuth } from '~/hooks/useAuth'
import { TextInput } from '../base/textInput'
import { FaCheck } from 'react-icons/fa'
import { load } from "@cashfreepayments/cashfree-js";


type Props = {
    competition: any
}

export const ChampionshipExamPurchase: React.FC<Props> = ({ competition }) => {

    const [orderProfile, setOrderProfile] = React.useState({
        name: '',
        email: '',
        phone: '',
        country_code: '91'
    })
    const [selectedExams, setSelectedExams] = React.useState([])
    const [admitCard, setAdmitCard] = React.useState(null)
    const [modalOpen, setModalOpen] = React.useState(false)
    const [orderProfileModalOpen, setOrderProfileModalOpen] = React.useState(false);
    const [focusedField, setFocusedField] = React.useState<string | null>(null);


    const { isAuthenticated } = useAuth()
    const { data: examinations = [], isLoading: loadingExaminations } = listExaminations(competition.id)
    const { data: championship } = getChampionship(competition.id)

    const { data: order, isLoading: loadingPrice } = getOrderPrice(competition.id, selectedExams.map((exam: any) => exam.value))
    const { mutateAsync: createOrderMutation } = createOrder()
    const { mutateAsync: captureOrderMutation } = captureOrder()

    const handleFocus = (field: string) => {
        setFocusedField(field);
    };
    const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
        setOrderProfile(prev => ({ ...prev, [field]: e.target.value }));
    };


    const { mutate: payNowMutation, isLoading: payNowRunning, isError, error } = useMutation<any, AxiosError<any>>({
        mutationFn: useCallback(async () => {
            const result = await createOrderMutation({
                championshipId: competition.id,
                examinationIds: selectedExams.map((exam: any) => exam.value),
                name: orderProfile.name,
                phone: orderProfile.phone,
                email: orderProfile.email,
                country_code: orderProfile.country_code

            })
            const cashfree = await load({
                mode: "sandbox"
            });
            const razpResult: any = await new Promise((resolve, reject) => {
                const checkoutOptions = {
                    paymentSessionId: result.payment_session_id,
                    redirectTarget: "_modal",
                };
                cashfree.checkout(checkoutOptions).then((result) => {
                    if (result.error) {
                        // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
                        reject(result.error)
                    }
                    if (result.redirect) {
                        console.log("Payment will be redirected");
                    }
                    if (result.paymentDetails) {
                        resolve(result.paymentDetails)
                    }
                });
            })



            const captureOrderRes = await captureOrderMutation({
                orderId: result.order_id,
                paymentId: razpResult.razorpay_payment_id,
                signature: razpResult.razorpay_signature
            })
            setAdmitCard(captureOrderRes)
            setModalOpen(true)
        }, [competition, selectedExams, orderProfile])

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
                                    isOptionDisabled={() => selectedExams.length >= championship?.max_exams || isAuthenticated}
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
                                            <div>
                                                <div>
                                                    {
                                                        loadingPrice ? (
                                                            <Loading />
                                                        ) : (

                                                            <ActionButton
                                                                onClick={() =>
                                                                    setOrderProfileModalOpen(true)
                                                                }
                                                            >
                                                                Pay Now
                                                            </ActionButton>

                                                        )

                                                    }
                                                </div>
                                                {isError && <div className="text-red-500 mt-3 text-sm">

                                                    {error?.response?.data?.context?.ERROR || "Payment Failed. Please try Again later"}
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

            <Popup modal open={orderProfileModalOpen} onClose={() => setOrderProfileModalOpen(false)} closeOnDocumentClick>
                <div className="relative">
                    <TextInput
                        id="name"
                        label="Name"
                        value={orderProfile.name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'name')}
                        onFocus={() => handleFocus('name')}
                    />
                    {focusedField === 'name' && orderProfile.name && (
                        <FaCheck className="absolute right-2 top-2 text-green-500" />
                    )}
                </div>
                <div className="relative">
                    <TextInput
                        id="phone"
                        label="Phone"
                        value={orderProfile.phone}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'phone')}
                        onFocus={() => handleFocus('phone')}
                    />
                    {focusedField === 'phone' && orderProfile.phone && (
                        <FaCheck className="absolute right-2 top-2 text-green-500" />
                    )}
                </div>
                <div className="relative">
                    <TextInput
                        id="email"
                        label="Email"
                        value={orderProfile.email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'email')}
                        onFocus={() => handleFocus('email')}
                    />
                    {focusedField === 'email' && orderProfile.email && (
                        <FaCheck className="absolute right-2 top-2 text-green-500" />
                    )}
                </div>
                <ActionButton
                    onClick={() => payNowMutation()}
                    isLoading={payNowRunning}
                >
                    Proceed
                </ActionButton>
                {isError && <div className="text-red-500 mt-3 text-sm">
                    {error?.response?.data?.context?.ERROR || "Payment Failed. Please try Again later"}
                </div>
                }
            </Popup>

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

