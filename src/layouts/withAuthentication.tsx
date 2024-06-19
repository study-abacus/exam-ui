import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useAuth } from '~/hooks/useAuth'


export const WithAuthentication: React.FC = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated && false) {
        return <Navigate to="/" />
    }

    return <Outlet />

}

