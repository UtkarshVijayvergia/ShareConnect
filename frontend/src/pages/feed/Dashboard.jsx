import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileCard from './feedComponents/ProfileCard'
import Feed from './feedComponents/Feed'
import AdsCard from './feedComponents/AdsCard'
import NewPost from './feedComponents/NewPost'
import './dashboard.css'


const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)
    const [posts, setPosts] = useState([]);
    const [profilePicUrl, setProfilePicUrl] = useState([]);


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
            setPosts(await response.json());
        }
        catch (error) {
            console.log(error);
        }
    }


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


    useEffect(() => {
        // if user not authenticated then not allowed to visit this page (Protected route)
        if(!user){
            navigate('/login')
        }
        getFeed();
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
        <div className="backgraound-color-setter">
            <div className='container'>
                <div className="row align-items-start">
                    <div className="col margin-setter">
                        <ProfileCard/>
                    </div>
                    <div className="col-6 margin-setter">
                        <NewPost setPosts={setPosts} userProfilePic={profilePicUrl}/>
                        <hr />
                        <Feed posts={posts} setPosts={setPosts} userProfilePic={profilePicUrl}/>
                        <br />
                    </div>
                    <div className="col margin-setter">
                        <AdsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard