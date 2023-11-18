import { fetchUserAuthAPI } from '@/apis/user'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUserThunk = createAsyncThunk('user/fetchUser', async () => {
  const { user } = await fetchUserAuthAPI()
  return user
})
