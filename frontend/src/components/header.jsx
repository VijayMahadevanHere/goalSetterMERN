import{FaSignInAlt,FaUser,FaSignOutAlt} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { reset,logout } from '../features/auth/authSlice';

function Header() {
    const{user}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const onLogout=()=>{
        dispatch(reset())
        dispatch(logout())

        navigate('/')

    }
  return (
   <header className='header'>
    <div className='logo'>
        <Link to='/'>GOAL SETTER</Link>
       

    </div>
    <ul>
        { user ? (<>
            <li>
              <button className='btn' onClick={onLogout}>
                 <FaSignOutAlt/> logout
                 </button>
            </li>
        </>) : (<>
            <li>
                <Link to='/login'>
                 <FaSignInAlt/> login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                 <FaUser/> SignUp
                </Link>
            </li>
        </>)}
            
        </ul>
   </header>
  )
}

export default Header
