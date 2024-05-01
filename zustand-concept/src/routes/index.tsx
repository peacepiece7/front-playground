import type { RouteObject } from 'react-router'
import App from '@/App'
import { Layout } from '@/components/Layout'
import { Bear } from '@/pages/Bear'
import { LikeRedux } from '@/pages/LikeRedux'
import { SelectorExample } from '@/pages/Selector'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: 'bear',
        element: <Bear />,
      },
      {
        path: 'like-redux',
        element: <LikeRedux />,
      },
      {
        path: 'selector',
        element: <SelectorExample />,
      },
    ],
  },
]
