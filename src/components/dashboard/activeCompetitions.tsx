import React from 'react'
import { listChampionships } from '~/api/endpoints/championships'
// import { ChampionshipExamPurchase } from '~/components/dashboard/championshipExamPurchase'


export const ActiveCompetitions: React.FC = () => {
    const { data: competitions } = listChampionships()

    return (
        <>
            <div className="bg-white">
                <div className="container mx-auto divide-y">
                    {competitions && competitions.map((competition: any) => (
                        <div className="py-5" key={competition.id}>
                            <div className="text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 mb-3">
                                {competition.name}
                            </div>
                            {/* <div className="text-center text-sm text-gray-900 mb-4">
                                Examination Fee: ₹{competition.primary_price/100}
                            </div> */}
                            {/* <ChampionshipExamPurchase competition={competition} /> */}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

