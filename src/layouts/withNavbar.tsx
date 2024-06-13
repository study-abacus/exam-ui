import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '~/components/layout/navbar.tsx'
import { Footer } from '~/components/layout/footer.tsx'
import { Loading } from '~/components/loading.tsx'


export const WithNavbar: React.FC = () => {
    return (
        <div className="flex flex-col h-screen">
            <div className="">
                <Navbar />
            </div>
            <div className="grow">
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </div>
            <div className="">
                <Footer />
            </div>
        </div>
    )
}

