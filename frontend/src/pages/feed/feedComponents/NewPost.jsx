import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './newPost.css'


const NewPost = ({ setPosts }) => {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate([]);


    const [profilePicUrl, setProfilePicUrl] = useState([]);
    const [newPost, setNewPost] = useState([{
        title: "",
        body: "",
    }]);
    const [buttonText, setButtonText] = useState('Post');
    const [buttonColor, setButtonColor] = useState('green');


    const { title, body } = newPost[0]!=null ? newPost[0] : {};


    const getProfilePic = async () => {
        try {
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
        catch (error) {
            console.log(error);
        }
    }


    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setNewPost([{ ...newPost[0], [name]: value }])
    }


    const handleClick = () => {
        // Change the text of the button to "Saving..." and the color to "green"
        setButtonText('Adding New Post...');
        setButtonColor('grey');
        // Set a timeout to run the following function after 1 second (1000 milliseconds)
        setTimeout(() => {
          // Change the text of the button back to "Submit" and the color back to "blue"
          setButtonText('Posted');
          setButtonColor('blue');
          setTimeout(() => {
            // Change the text of the button back to "Submit" and the color back to "blue"
            setButtonText('Post');
            setButtonColor('green');
          }, 1000);
        }, 1000);
    };


    const submit = async (e) => {
        e.preventDefault();
        handleClick()
        const response = await fetch(`http://localhost:5000/api/user/posts`, {
            method: "POST",
            headers:{
                Authorization:  `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body })
        })
        const post = await response.json();
        setPosts(prevPosts => [post, ...prevPosts]);
    }


    useEffect(() => {
        // if user not authenticated then not allowed to visit this page (Protected route)
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])


    // Get user profile pic - UseEffect
    useEffect(() => {
        const fetchImageUrl = async () => {
          const url = await getProfilePic();
          setProfilePicUrl(url);
        };
      
        fetchImageUrl();
    }, []);


    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="new-post-heading">
                        Start New Post
                    </div>
                    <div className="new-post-direction">
                        <div className="new-post-profile-pic">
                            <img className='post-profile-pic' src={profilePicUrl} alt="Profile Picture" />
                        </div>
                        <input className='new-title-area' rows="6" aria-invalid="false" aria-describedby="" name="title" value={title} placeholder="Post Title" aria-label="Post Title" onChange={onChange}></input>
                    </div>
                    <textarea className='new-body-area' rows="6" aria-invalid="false" aria-describedby="" name="body" value={body} placeholder="Body" aria-label="Body" onChange={onChange}></textarea>
                    <div className="post-btn">
                        <button tabIndex="-1" type="submit" className="btn-lg btn-primary post-btn-editor" style={{backgroundColor: buttonColor}} onClick={submit}>{buttonText}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPost