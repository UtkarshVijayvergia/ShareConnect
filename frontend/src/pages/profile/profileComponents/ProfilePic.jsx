import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './profilePic.css'

const ProfilePic = () => {
    const { user } = useSelector((state) => state.auth)
    const [profilePicUrl, setProfilePicUrl] = useState();

    // Get user profile pic
    const getImage = async () => {
        try{
            const response = await fetch(`http://localhost:5000/api/user/profilepic/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            return url;
        }
        catch(error){
            console.log(error);
        }
    }

    // Get user profile pic - UseEffect
    useEffect(() => {
        const fetchImageUrl = async () => {
          const url = await getImage();
          setProfilePicUrl(url);
        };
      
        fetchImageUrl();
    }, []);

    return (
        <div>
            <div className='card profilePicContainer'>
                <img className='profilePic' src={profilePicUrl} alt="Profile Picture" />
            </div>
        </div>
    )
}

export default ProfilePic