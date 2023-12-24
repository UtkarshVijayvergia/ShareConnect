import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const UserFeed = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])


    return (
        <div>
            <div>
                Dashboard
                {/* { user ? (<> <br /><br />{user.name}<br />{user.email}<br /><br /><p>qwerty</p></>) : (<>nothing to display</>) } */}
            </div>
        </div>
    )
}

export default UserFeed