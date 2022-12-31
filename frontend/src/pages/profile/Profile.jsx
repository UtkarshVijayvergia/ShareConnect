import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './profile.css'
import ProfilePic from './profileComponents/ProfilePic'
import User from './profileComponents/User'
import RecentPosts from './profileComponents/RecentPosts'

const Profile = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <div className='container'>
            {
                user ? (<>
                    <div>
                        <div className='ProfilePic'>
                            <ProfilePic />
                        </div>
                        <br />
                        <div className='user'>
                            <User 
                                name = {user.name}
                                email = {user.email}
                                _id = {user._id}
                            />
                        </div>
                        <br /><br /><hr /><br />
                        <div className='recentPosts'>
                            <RecentPosts />
                        </div>
                        <hr />
                    </div>
                </>)
                :
                (<></>)
            }
        </div>
    )
}

export default Profile