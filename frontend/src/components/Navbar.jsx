import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return (
        <>
            <header className="header">
            <div className="logo">
                <Link to="/"> <img src={require(`../components/images/NavbarIcon.jpg`)} alt="PageIt" height={'25px'} /></Link>
            </div>
            <ul>



                    
                        {
                            user
                            ?
                            (
                                <>
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link to="/about">About</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">Contact</Link>
                                    </li>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register">Signup</Link>
                                    </li>
                                    <li>
                                        <button className="btn" onClick={onLogout}><FaSignOutAlt />Logout</button>
                                    </li>
                                </>
                            )
                            :
                            (
                                <>
                                    <li>
                                        <Link to='/login'><FaSignInAlt />Login</Link>
                                    </li>
                                    <li>
                                        <Link to='/register'><FaUser />Register</Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
            </header>
        </>
    )
}

export default Navbar