import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../../features/auth/authSlice'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaLock, FaEnvelope } from 'react-icons/fa'
import Spinner from '../../components/Spinner'
import './login.css'


const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const { email, password } = formData;

    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if(isError){
          toast.error(message)
        }
  
        if(isSuccess || user){
          navigate('/home')
        }
  
        dispatch(reset())
      
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData( (prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }


    if(isLoading){
        return <Spinner />
    }


    return (
        <div>
            <div className='setPage div-center'>
                <div className='card login-card'>
                    <div className='row'>
                        <div className="col">
                            <div className='img-login'>
                                <img src={require(`../../assets/images/auth/login.jpg`)} height="150px" alt="ShareConnect"/>
                            </div>
                            <div className='toRegister'>
                                <b><Link className="no-decoration" aria-current="page" to={`/register`}>Create an Account</Link></b>
                            </div>
                        </div>
                        <div className="col">
                            <div className='rightCol'>
                                <div className='card-heading'>
                                    <h4><b>Login</b></h4>
                                </div>
                                <form onSubmit={onSubmit}>
                                    <div className="form-group formPadder">
                                        <div className='inputTaker form-control'>
                                            <FaEnvelope className='faFig'/>
                                            <input type="email" id='email' name='email' value={email} placeholder='Your Email' onChange={onChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group formPadder">
                                        <div className='inputTaker form-control'>
                                            <FaLock className='faFig'/>
                                            <input type="password" id='password' name='password' value={password} placeholder='Your Password' onChange={onChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group submitForm">
                                        <button type="submit" className="btn btn-block">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login