import { Link } from "react-router-dom"
import { useAuthStore } from "../store/useAuthStore"
const Navbar = () => {

const {authUser}=useAuthStore();


  return (
    <>
    <div className="sticky top-0 z-50 bg-linear-to-t  from-slate-950 to-black text-white w-full h-14">
      <div className="flex justify-between sm:px-36 px-8 items-center h-14">
        <div>
          <h1 className="text-xl font-bold">IngreWish</h1>
        </div>
        {authUser ?(
        <div className="hidden gap-4">
          <Link className="px-4 py-1 border rounded" to='/saved-recipe'> Saved Recipe</Link>
          <Link className="px-4 py-1" to='/logout'>Logout</Link>
        </div>
        ):(
        <div className="flex gap-4 sm:text-sm text-xs">
          <Link className="px-4 py-1 border rounded" to='/login'> Login</Link>
          <Link className="px-4 py-1" to='/signup'>SignUp</Link>
        </div>
        )}
      </div>

    </div>
    </>
  )
}

export default Navbar
