import { Outlet } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from './utils/axiosInstance'
import { setUser, setLoading } from './store/slices/authSlice'
import Navbar from './components/Navbar'

const fetchCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/api/auth/me')
    return response.data.user
  } catch (error) {
    if (error.response?.status === 401) {
      return null
    }
    throw error
  }
}

function RootLayout() {
  const dispatch = useDispatch()

  const { data: user, isLoading } = useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  useEffect(() => {
    dispatch(setLoading(isLoading))
    if (!isLoading) {
      dispatch(setUser(user))
    }
  }, [user, isLoading, dispatch])

  return (
    <div className="min-h-screen gradient-bg">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
