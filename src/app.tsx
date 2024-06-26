import React from 'react'
import { QueryClientProvider, QueryClient } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import { router } from '~/router.tsx'


const queryClient = new QueryClient()

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

