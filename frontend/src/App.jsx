import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage';
import SignUppage from './pages/SignUppage';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
import { useAuhtStore } from './store/userAuthstore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

function App() {

  const { authUser, checkAuth, isCheckingAuth } = useAuhtStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  )

  return (
    <div className='text-red-500' >
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/signup' element={!authUser ? <SignUppage /> : <Navigate to='/' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/setting' element={<SettingPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to='/login' />} />
      </Routes>
    </div>
  )
}

export default App