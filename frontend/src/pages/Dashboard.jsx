import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import UserFeed from './feed/UserFeed'


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
            <UserFeed/>
        </div>
    )
}

export default Dashboard