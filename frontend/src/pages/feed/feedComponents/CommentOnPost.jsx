import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import './commentOnPost.css'


const CommentOnPost = ({ postID, posts, setPosts, userProfilePic, postComments }) => {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate([]);

    const [profilePicUrl, setProfilePicUrl] = useState([]);
    const [userDetails, setUserDetails] = useState([]);
    const [comment, setComment] = useState({
        comment_text: "",
    });

    const { comment_text } = comment;

    const handleCommentChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setComment({ ...comment, [name]: value })
    }

    const addComment = async (id) => {
        try {
            const response = await fetch(`/api/user/posts/${id}/comment`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            });
            if (!response.ok) {
                throw new Error('Comment failed to add');
            }
            const updatedFeed = await response.json();
            // Update the feed in your state
            setPosts(prevFeed => {
                // Each post in the feed has an array of comments
                return prevFeed.map(post => post._id === id ? updatedFeed : post);
            });
            // Clear the comment input field
            setComment({ comment_text: "" });
        }
        catch (error) {
            console.error('Failed to add comment:', error);
            toast.error("An error occurred while adding the comment");
        }
    };


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
        // If user not authenticated then not allowed to visit this page (Protected route)
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])


    useEffect(() => {
        const fetchImageUrl = async () => {
            if (postComments) {
                // Map each feed item to a promise that resolves to the profile pic URL
                const profilePicPromises = postComments.map(async (curr) => {
                    const url = await getProfilePic(curr.user_id);
                    return url;
                });
                // Wait for all promises to resolve
                const PicUrls = await Promise.all(profilePicPromises);
                // Set the state with the array of profile picture URLs
                setProfilePicUrl(PicUrls);
            }
        };
        fetchImageUrl();
    }, [postComments]);


    useEffect(() => {
        const fetchUserDetails = async () => {
            if (postComments) {
                // Map each userDetails item to a promise that resolves to the userDetails ID
                const userDetailsPromises = postComments.map(async (curr) => {
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
    }, [postComments]);


    // Auto resize the textarea
    useEffect(() => {
        const textarea = document.querySelector('.post-comment-input');
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }, [comment_text]);

    return (
        <div className='post-comment-section'>
            <div className='add-post-comment'>
                <div className="new-post-comment-profile-pic">
                    <img className='post-comment-profile-pic' src={userProfilePic} alt="Profile Picture" />
                </div>
                <textarea className='post-comment-input' name='comment_text' value={comment_text} onChange={(e) => handleCommentChange(e)} placeholder="Add A Comment" />
            </div>
            {
                comment_text === "" ? null : 
                <div className="add-comment-btn-pos">
                    <button className='add-comment-btn' onClick={() => addComment(postID)}>Post</button>
                </div>
            }
            <div className="other-post-comments">
                {
                    postComments?.map((comment, index) => {
                        return (
                            <div key={index} className="post-other-comment">
                                <div className="post-other-comment-head">
                                    <div className="post-other-comment-profile-pic">
                                        <img className='post-comment-profile-pic' src={profilePicUrl[index]} alt="Profile Picture" />
                                    </div>
                                    <div className="post-other-comment-name">
                                        {userDetails[index]?.name} &middot; {userDetails[index]?.email} &middot;
                                    </div>
                                    <div className="post-other-comment-time">
                                        {Date.now() - new Date(comment.created_at).getTime() > 86400000 ? Math.floor((Date.now() - new Date(comment.created_at).getTime()) / 86400000) + " days ago" : Date.now() - new Date(comment.created_at).getTime() > 3600000 ? Math.floor((Date.now() - new Date(comment.created_at).getTime()) / 3600000) + " hours ago" : Date.now() - new Date(comment.created_at).getTime() > 60000 ? Math.floor((Date.now() - new Date(comment.created_at).getTime()) / 60000) + " minutes ago" : Math.floor((Date.now() - new Date(comment.created_at).getTime()) / 1000) + " seconds ago"}            
                                    </div>
                                </div>
                                <div className="post-other-comment-content">
                                    {comment.comment_text}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default CommentOnPost;
