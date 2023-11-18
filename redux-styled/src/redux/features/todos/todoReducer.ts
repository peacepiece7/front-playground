import { createSlice } from '@reduxjs/toolkit'
import { TODOS } from '@/constants/reducer'

const todoSlice = createSlice({
  name: 'todo',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(TODOS, (state, action) => {
      return { ...state, ...action.payload }
    })
    // builder.addDefaultCase((state, action) => {})
  },
})

export default todoSlice.reducer
