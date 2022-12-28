import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import './navbar.css'

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
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid navbar-margin">
                    {
                        user
                        ?
                        (
                            <>
                                <Link className="navbar-brand" to="/home"><img src={require(`../components/images/ShareConnectNavbarIcon.jpg`)} height="40px" alt="ShareConnect"/></Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </>
                        )
                        :
                        (
                            <>
                                <Link className="navbar-brand" to="/"><img src={require(`../components/images/ShareConnectNavbarIcon.jpg`)} height="40px" alt="ShareConnect"/></Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </>
                        )
                    }
                    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">           
                        </ul>
                        <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
                            {
                                user
                                ?
                                (
                                    <>
                                        <li className="nav-item px-2">
                                            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
                                        </li>
                                        <li className="nav-item px-2">
                                            <Link className="nav-link active" aria-current="page" to="/about">Profile</Link>
                                        </li>
                                        <li className="nav-item  padder">
                                            <Link className="nav-link active" aria-current="page" to="/contact">Contact</Link>
                                        </li>
                                        <li className="nav-item dropdown dropper">
                                            <Link className="nav-link active dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <FaUser/>  &nbsp; {user.name}
                                            </Link>
                                            <ul className="dropdown-menu dropdown-content" aria-labelledby="navbarDropdown">
                                                <Link className="nav-link active"  aria-current="page" to="">Account</Link>
                                                <Link className="nav-link active"  aria-current="page" to="">Help</Link>
                                                <li><hr className="dropdown-divider"/></li>
                                                <Link className="nav-link active"  aria-current="page" to="/login" onClick={onLogout}>Logout</Link>
                                            </ul>
                                        </li>
                                        {/* <li className="nav-item px-2">
                                            <Link className="nav-link active"  aria-current="page" to="/login" onClick={onLogout}>Logout</Link>
                                        </li> */}
                                    </>
                                )
                                :
                                (
                                    <>
                                        <li className="nav-item px-2">
                                            <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item px-2">
                                            <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
                                        </li>
                                    </>
                                )
                            }                            
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar