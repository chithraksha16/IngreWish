import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
import { Save } from "lucide-react";
const Navbar = () => {

const {authUser,logout}=useAuthStore();


  return (
    <>
    <div className="sticky top-0 z-50 bg-linear-to-t  from-slate-950 to-black text-white w-full h-14">
      <div className="flex justify-between sm:px-36 px-8 items-center h-14">
        <div>
          <h1 className="text-xl font-bold"><Link to={'/recipe'}>IngreWish</Link></h1>
        </div>
        {authUser ?(
        <div className="flex gap-4 sm:text-sm text-xs">
          <Link className="px-3 py-1 border border-gray-800 rounded flex items-center gap-1" to='/saved-recipe'><span className="inline-flex items-center"><Save size={15} /></span> Recipe</Link>
          <button onClick={logout} className="px-4 py-1">Logout</button>
        </div>
        ):(
        <div className="flex gap-4 sm:text-sm text-xs">
          <Link className="px-4 py-1 border border-gray-800 rounded" to='/login'> Login</Link>
          <Link className="px-4 py-1" to='/signup'>SignUp</Link>
        </div>
        )}
      </div>

    </div>
    </>
  )
}

export default Navbar
