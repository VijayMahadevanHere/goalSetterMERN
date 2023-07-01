import{FaSignInAlt,FaUser} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function header() {
  return (
   <header className='header'>
    <div className='logo'>
        <Link to='/'>GOAL SETTER</Link>
      

    </div>
    <ul>
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
        </ul>
   </header>
  )
}

export default header
