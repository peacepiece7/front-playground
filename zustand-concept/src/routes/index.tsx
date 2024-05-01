import type { RouteObject } from 'react-router'
import App from '@/App'
import { Layout } from '@/components/Layout'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
    ],
  },
]
