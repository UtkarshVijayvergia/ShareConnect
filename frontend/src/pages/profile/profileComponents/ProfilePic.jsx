import React from 'react'
import './profilePic.css'

const ProfilePic = () => {
    return (
        <div>
            <div className='card profilePicContainer'>
                <img className='profilePic' src={require('../../../images/profileImages/bakugou.jpg')} alt="" />
            </div>
        </div>
    )
}

export default ProfilePic