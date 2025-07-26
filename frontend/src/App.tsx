import { Routes,Route,Navigate } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Onboard from './components/Onboard'
import Navbar from './components/Navbar'
import Recipe from './components/Recipe'
import SavedRecipe from './components/SavedRecipe'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { LoaderCircle } from 'lucide-react'
function App() {
 

  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])


  if(isCheckingAuth && !authUser) return (
    <div className='flex justify-center items-center h-screen'>
      <LoaderCircle size={25} className='animate-spin' />
    </div>
  )



  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/login' element={!authUser ? <Login/>:<Navigate to="/recipe"/>}/>
        <Route path='/signup' element={!authUser ? <Signup/>:<Navigate to="/recipe"/>}/>
        <Route path='/' element={!authUser ? <Onboard/>:<Navigate to="/recipe"/>}/>
        <Route path='/recipe' element={<Recipe/>}/>
        <Route path='/saved-recipe'element={authUser ? <SavedRecipe/>:<Navigate to="/recipe"/>}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App
