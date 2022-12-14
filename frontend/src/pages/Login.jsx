import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { FaSignInAlt } from 'react-icons/fa'

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
            {/* <section className="heading">
                <h1><FaSignInAlt/>Login</h1>
                <p>If you haven't created an account than please Register</p>
            </section> */}
            <div className="container"><h3><u>LOGIN TO PAGEIT</u></h3></div>

            {/* <section className="form"> */}
            <center>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter Your Email' onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter Your Password' onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Submit  </button>
                    </div>
                </form>
            </center>
            {/* </section> */}
        </div>
    )
}

export default Login