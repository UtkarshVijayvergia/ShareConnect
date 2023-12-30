import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import './feed.css'


const Feed = () => {
    const { user } = useSelector((state) => state.auth)
    const [profilePicUrl, setProfilePicUrl] = useState();
    const [feed, setFeed] = useState()
    const navigate = useNavigate([]);

    
    const getFeed = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/user/posts', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
            // console.log(response);
            setFeed(await response.json());
        }
        catch (error) {
            console.log(error);
        }
    }


    const getProfilePic = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/user/profilepic/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
            // if (!response.ok) {
            //     toast.error("Error retrieving profile picture. Please Upload Again");
            // }
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            return url;
        }
        catch (error) {
            console.log(error);
            toast.error("An error occurred while fetching the profile picture");
            return null;
        }
    }


    useEffect(() => {
        // if user not authenticated then not allowed to visit this page (Protected route)
        if (!user) {
            navigate('/login')
        }
        // get user details
        getFeed()
    }, [user, navigate])


    useEffect(() => {
        const fetchImageUrl = async () => {
            if (feed) {
                // Map each feed item to a promise that resolves to the profile pic URL
                const profilePicPromises = feed.map(async (curr) => {
                    const url = await getProfilePic(curr.user_id);
                    return url;
                });
                // Wait for all promises to resolve
                const profilePicUrls = await Promise.all(profilePicPromises);
                // Set the state with the array of profile picture URLs
                setProfilePicUrl(profilePicUrls);
            }
        };
        fetchImageUrl();
    }, [feed]);


    return (
        <div>
            <div className="card">
                <div className="card-body">
                    {
                        feed?.map((curr, index) => {
                            return <div>
                                <div className="card-body-style">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="container">
                                                <div className="user-details">
                                                    <div className="user-profile-pic">
                                                        {profilePicUrl && profilePicUrl[index] && (<img className='profile-pic' src={profilePicUrl[index]} alt={`Profile Picture ${index}`} />)}
                                                    </div>
                                                    <div className="user-name">
                                                        {curr.title}
                                                        {curr.body}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Feed