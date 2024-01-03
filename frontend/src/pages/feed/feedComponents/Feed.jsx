import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';
import { FaRegComment } from 'react-icons/fa';
import './feed.css'
import CommentOnPost from './CommentOnPost';


const Feed = ({posts, setPosts, userProfilePic}) => {
    const { user } = useSelector((state) => state.auth)
    const [profilePicUrl, setProfilePicUrl] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const navigate = useNavigate([]);
    const [showComments, setShowComments] = useState([]);


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

    
    const postReact = async (id) => {
        try {
            const response = await fetch(`/api/user/posts/${id}/like`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Response is not ok');
            }
            const updatedFeed = await response.json();
            // Update the feed in your state
            setPosts(prevFeed => {
                return prevFeed.map(post => post._id === id ? updatedFeed : post);
            });
        } 
        catch (error) {
            console.error('Failed to react to post:', error);
        }
    };


    const handleCommentclick = (post_id) => {
        // push the post_id to the showComments array
        if (!showComments?.includes(post_id)) {
            setShowComments(prevShowComments => [...prevShowComments, post_id]);
        }
        else {
            // remove the post_id from the showComments array
            setShowComments(prevShowComments => prevShowComments.filter(id => id !== post_id));
        }
    }


    useEffect(() => {
        // If user not authenticated then not allowed to visit this page (Protected route)
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])


    useEffect(() => {
        const fetchUserDetails = async () => {
            if (posts) {
                // Map each userDetails item to a promise that resolves to the userDetails ID
                const userDetailsPromises = posts.map(async (curr) => {
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
    }, [posts]);


    useEffect(() => {
        const fetchImageUrl = async () => {
            if (posts) {
                // Map each feed item to a promise that resolves to the profile pic URL
                const profilePicPromises = posts.map(async (curr) => {
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
    }, [posts]);


    return (
        <div>
            {posts?.map((curr, index) => (
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
                                    <div className="btn post-like"  onClick={() => postReact(curr._id)}>
                                        <div className="like-counter">
                                            ({curr?.likes?.length})
                                        </div>
                                        {
                                            curr?.likes?.some(like => like.user_id === user._id) ?
                                                <i className="far fa-thumbs-up"><FaThumbsUp /></i>
                                                :
                                                <i className="far fa-thumbs-up"><FaRegThumbsUp /></i>
                                        }
                                        <div className="like-count">Like</div>
                                    </div>
                                    <div className="btn post-comment"  onClick={() => handleCommentclick(curr._id)}>
                                        <div className="comment-counter">
                                            ({curr?.comments?.length})
                                        </div>
                                        <i className="far fa-comment"><FaRegComment /></i>
                                        <div className="comment-count">Comment</div>
                                    </div>
                                </div>
                                    {   
                                        showComments && showComments.includes(curr._id) 
                                        ? 
                                        <CommentOnPost postID={curr._id} posts={posts} setPosts={setPosts} userProfilePic={userProfilePic} postComments={curr.comments}/> 
                                        : 
                                        null
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Feed