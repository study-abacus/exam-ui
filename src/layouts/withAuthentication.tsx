import React from 'react'
import { Outlet } from 'react-router-dom'
import { Route, Navigate } from 'react-router-dom'
import { useAuth } from '~/hooks/useAuth'


type Props = {
    children: React.ReactNode
}

export const WithAuthentication: React.FC = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" />
    }

    return <Outlet />

}

