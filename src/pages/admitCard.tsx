import React from 'react'
import { ProfileEditor } from '~/components/admitCard/profileEditor'


export const Component: React.FC = () => {
    return (
        <div className="container mx-auto py-4">
            <div className="flex flex-row">
                <div className="mx-5 relative flex flex-col mt-6  basis-1/2">
                    <div className="text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl p-5">
                        <div className="text-3xl text-center">
                            Profile
                        </div>
                        <div className="mt-3">
                            <ProfileEditor />
                        </div>
                    </div>
                </div>
                <div className="mx-5 relative flex flex-col mt-6  basis-1/2">
                    <div className="text-gray-700 bg-gray-100 shadow-md bg-clip-border rounded-xl p-5">
                        <div className="text-3xl text-center">
                            Examinations
                        </div>
                        <div className="bg-white rounded-xl divide-y text-gray-900 divide-gray-200 mt-5">
                            <div className="flex flex-row p-3 justify-between">
                                <div>
                                    <div className="text-lg font-semibold">Abacus Level 1</div>
                                    <div className="mt-1 text-gray-500 md:text-md">1 July 2024</div>
                                </div>
                                <div className="flex justify-end items-center">
                                    <div>
                                        <button
                                            type="button"
                                            className="py-3 px-4 inline-flex items-center gap-x-2
                                            text-sm font-semibold rounded-lg border
                                            border-transparent bg-blue-600 text-white
                                            hover:bg-blue-700 disabled:opacity-50
                                            disabled:pointer-events-none">
                                            Start Exam
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

