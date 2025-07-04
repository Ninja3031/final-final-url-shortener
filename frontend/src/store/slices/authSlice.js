import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
      state.loading = false
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = false
    },
  },
})

export const { setUser, setLoading, logout } = authSlice.actions
export default authSlice.reducer
