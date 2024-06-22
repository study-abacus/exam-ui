import React from 'react'


type Props = {
    isLoading? : boolean
    children: React.ReactNode
    onClick: () => void
}

export const ActionButton: React.FC<Props> = ({ isLoading = false, children, onClick }) => {
    const disabledClass = isLoading ? 'opacity-50 cursor-not-allowed' : ''

    return (
        <>
            <button
                className={`py-4 px-6  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 ${disabledClass}`}
                onClick={() => onClick()}
                disabled={isLoading}
            >
                {isLoading && (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>)}
                {children}
            </button>
        </>
    )
}

