import React from 'react'


export const Footer: React.FC = () => {
    return (
        <>
            <footer className="sticky bottom-0 bg-neutral-700 text-center lg:text-left">
                <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
                    © 2024 Copyright:
                    <a className="text-neutral-800 dark:text-neutral-400" href="https://studyabacus.com/">Study Abacus</a>
                </div>
            </footer>
        </>
    )
}

