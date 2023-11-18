import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { selectUser } from '@/redux/features/user/userReducer'
import { fetchUserThunk } from '@/redux/features/user/userThunk'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(selectUser)

  if (status === 'pending') {
    dispatch(fetchUserThunk())
    return <div>Loading...</div>
  }

  if (status === 'rejected') {
    return <Navigate to='/login' />
  }

  return <Outlet />
}
