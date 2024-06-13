import React from 'react'
import { Tabs } from '~/components/base/tabs'


export const ActiveCompetitions: React.FC = () => {
    return (
        <>
            <div className="bg-white">
                <div className="container mx-auto">
                    <div className="text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 mb-4">
                        Active Competitions
                    </div>
                    <div>
                        <Tabs />
                    </div>
                </div>
            </div>
        </>
    )
}

