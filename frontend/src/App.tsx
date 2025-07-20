import { Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Onboard from './components/Onboard'
import Navbar from './components/Navbar'
import Recipe from './components/Recipe'
import SavedRecipe from './components/SavedRecipe'
import { Toaster } from 'react-hot-toast'
function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Onboard/>}/>
        <Route path='/recipe' element={<Recipe/>}/>
        <Route path='/saved-recipe'element={<SavedRecipe/>}/>
        <Toaster/>
      </Routes>
    </>
  )
}

export default App
