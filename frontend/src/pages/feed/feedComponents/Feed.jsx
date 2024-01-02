import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import { FaComment } from 'react-icons/fa';
import './feed.css'


const Feed = () => {
    const { user } = useSelector((state) => state.auth)
    const [feed, setFeed] = useState([]);
    const [profilePicUrl, setProfilePicUrl] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
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


    const getuserDetails = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
            // Since the backend returns an array, let's get the first item if it exists
            const userDetailsArray = await response.json();
            const userDetail = userDetailsArray.length > 0 ? userDetailsArray[0] : null;
            return userDetail;
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
        const fetchUserDetails = async () => {
            if (feed) {
                // Map each userDetails item to a promise that resolves to the userDetails ID
                const userDetailsPromises = feed.map(async (curr) => {
                    const detail = await getuserDetails(curr.user_id);
                    return detail;
                });
                // Wait for all promises to resolve
                const usersDetail = await Promise.all(userDetailsPromises);
                // Set the state with the array of profile picture URLs
                setUserDetails(usersDetail);
            }
        };
        fetchUserDetails();
    }, [feed]);


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
            {feed?.map((curr, index) => (
                <div key={index} className="card-body-style">
                    <div className="card">
                        <div className="card-body">
                            <div className="container">
                                <div className="user-details">
                                    <div className="user-profile-pic">
                                        {profilePicUrl && profilePicUrl[index] && (
                                            <img className="profile-pic" src={profilePicUrl[index]} alt={`Profile Picture ${index}`} />
                                        )}
                                    </div>
                                    <div className="user-info">
                                        <div className="user-name">{userDetails[index]?.name}</div>
                                        <div className="user-email">{userDetails[index]?.email}</div>
                                    </div>
                                </div>
                                <hr className='post-partition'/>
                                <div className="post-details">
                                    <div className="post-title">{curr.title}</div>
                                    <div className="post-body">{curr.body}</div>
                                </div>
                                <hr className='post-partition'/>
                                <div className="post-reaction">
                                    <btn className="btn post-like">
                                        <i className="far fa-thumbs-up"><FaThumbsUp /></i>
                                        <div className="like-count">Like</div>
                                    </btn>
                                    <div className="btn post-comment">
                                        <i className="far fa-comment"><FaComment /></i>
                                        <div className="comment-count">Comment</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );


}

export default Feed