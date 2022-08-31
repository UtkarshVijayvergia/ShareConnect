import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { FaSignInAlt } from 'react-icons/fa'
import LoginPopup from '../components/LoginPopup'

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
        <div className='container'>
            <br />
            <br />
            <br />
            <div className="container"><h3><u>LOGIN TO PAGEIT</u></h3></div>

            {/* <section className="form"> */}
            <center>
                <form onSubmit={onSubmit}>
                    <div className="form-group login-textarea-control">
                        <input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter Your Email' onChange={onChange}/>
                    </div>
                    <div className="form-group login-textarea-control">
                        <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter Your Password' onChange={onChange}/>
                    </div><br />
                    <div className="form-group login-textarea-control login-button-padding-control">
                        <button type="submit" className="btn btn-block">Submit</button>
                    </div>
                </form>
            </center>
            {/* </section> */}
        </div>
    )
}

export default Login