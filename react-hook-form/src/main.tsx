import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { SignUp } from './components/SignUp.tsx'
import { Bar } from './components/Bar.tsx'
import './index.css'

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/signUp',
        element: <SignUp />,
      },
    ],
  },
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
