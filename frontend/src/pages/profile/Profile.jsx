import React from 'react'
import { useSelector } from 'react-redux'
import './profile.css'
import ProfilePic from './profileComponents/ProfilePic'
import User from './profileComponents/User'
import RecentPosts from './profileComponents/RecentPosts'

const Profile = () => {
    const { user } = useSelector((state) => state.auth)
    console.log(user);

    return (
        <div>
            <div className='ProfilePic'>
                <ProfilePic />
            </div>
            <br />
            <div className='user'>
                <User 
                    name = {user.name}
                    email = {user.email}
                />
            </div>
            <br /><br />
            <hr />
            <br />
            <div className='recentPosts'>
                <RecentPosts />
            </div>
            <hr />
            <br />
        </div>
    )
}

export default Profile