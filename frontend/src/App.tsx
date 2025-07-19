import { Routes,Route } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Recipe from './components/Recipe'
import SavedRecipe from './components/SavedRecipe'
function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/recipe' element={<Recipe/>}/>
        <Route path='/saved-recipe'element={<SavedRecipe/>}/>
      </Routes>
    </>
  )
}

export default App
