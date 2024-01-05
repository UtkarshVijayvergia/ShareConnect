import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './profileCard.css'

const ProfileCard = ({ userProfilePic }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // if user not authenticated then not allowed to visit this page (Protected route)
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <div className='margin-setter'>
            <div className="card">
                <div className="card-body">
                    <div className="feed-profile-pic-background">
                        <div className="feed-profile-pic-cover">
                            <img className='feed-profile-pic' 
                                onMouseEnter={() => setIsHovered(true)} 
                                onMouseLeave={() => setIsHovered(false)} 
                                src={userProfilePic} 
                                alt="Profile Picture"
                                onClick={() => navigate(`/user/${user.name}`)}
                            />
                        </div>
                    </div>
                    <div className="feed-profile-name-card">
                        <div className={isHovered ? "text-underliner" : ""} 
                            onMouseEnter={() => setIsHovered(true)} 
                            onMouseLeave={() => setIsHovered(false)} 
                            onClick={() => navigate(`/user/${user.name}`)}> {user.name}
                        </div>
                    </div>
                    <div className="feed-profile-email-card">
                        <p onMouseEnter={() => setIsHovered(true)} 
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={() => navigate(`/user/${user.name}`)}> {user.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard