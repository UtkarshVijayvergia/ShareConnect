import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import authReducer from '../features/auth/authSlice';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    // const userData = useSelector((state) => )
    console.log(user);

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])
    
    // const userData = authReducer.user;

    return (
        <div>
            Dashboard
            {user ? (<>
                <br />
                <br />
                {user.name}
                <br />
                {user.email}
                <br /><br />
                <p>qwerty</p>
                {/* { user } */}
                </>
            )
            :

            (<>nothing to display</>)}
            
        </div>
    )
}

export default Dashboard