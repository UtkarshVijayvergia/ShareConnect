import React from 'react'
import './profile.css'
import ProfilePic from './profileComponents/ProfilePic'
import { useSelector } from 'react-redux'
import User from './profileComponents/User'

const Profile = () => {
    const { user } = useSelector((state) => state.auth)
    console.log(user);

    return (
        <div>
            <div className='ProfilePic'>
                <ProfilePic />
            </div>
            <div className='user'>
                <User 
                    name = {user.name}
                    email = {user.email}
                />
            </div>
        </div>
    )
}

export default Profile