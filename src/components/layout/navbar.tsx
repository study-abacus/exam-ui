import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '~/hooks/useAuth'


export const Navbar: React.FC = () => {
    const [navOpen, setNavOpen] = React.useState(false)
    const {isAuthenticated, logout} = useAuth()

    return (
        <div className="sticky">
            <nav className="bg-gray-800 shadow">
                <div className="px-8 mx-auto max-w-7xl">
                    <div className="flex items-center justify-between h-16">
                        <div className="w-full justify-between flex items-center">
                            <Link className="flex-shrink-0 bg-white" to="/">
                                <img className="h-12" src="https://studyabacus.com/admin/assets/images/logo/1684778226Abacus.png" alt="Workflow"/>
                            </Link>
                            <div className="hidden md:block">
                                <div className="flex items-baseline ml-10 space-x-4">
                                    <Link
                                        className="text-white px-3 py-2 rounded-md text-sm font-medium"
                                        to="/" >
                                        Home
                                    </Link>
                                    <Link
                                        className="text-white px-3 py-2 rounded-md text-sm font-medium"
                                        to="/#active-competitions" >
                                        Active Competitions
                                    </Link>
                                    {isAuthenticated &&
                                    <button
                                    className="text-white px-3 py-2 rounded-md text-sm font-medium"
                                    onClick={() => {logout()}} >
                                    Logout
                                </button>}
                                </div>
                            </div>
                        </div>
                        <div className="flex -mr-2 md:hidden">
                            <button 
                                className="text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                                onClick={() => setNavOpen(_ => !_)}
                            >
                                <svg width="20" height="20" fill="currentColor" className="w-8 h-8" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {navOpen && <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link 
                            className="text-white block px-3 py-2 rounded-md text-base font-medium" 
                            to="/"
                        >
                            Home
                        </Link>
                        <Link 
                            className="text-white block px-3 py-2 rounded-md text-base font-medium" 
                            to="/#active-competitions"
                        >
                            Active Competitions
                        </Link>
                        {isAuthenticated &&
                                    <button
                                    className="text-white block px-3 py-2 rounded-md text-base font-medium" 
                                    onClick={() => {logout()}} >
                                    Logout
                                </button>}
                    </div>
                </div>}
            </nav>
        </div>
    )
}

