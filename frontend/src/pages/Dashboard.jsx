import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])
    

    return (
        <div>
            Dashboard
            {user ? (<>
                <br />
                <br />
                {user.name}
                <br />
                {user.email}</>
            )
            :

            (<>nothing to display</>)}
            
        </div>
    )
}

export default Dashboard