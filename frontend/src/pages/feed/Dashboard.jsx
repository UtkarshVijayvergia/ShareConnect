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


    useEffect(() => {
        if(!user){
            navigate('/login')
        }
        getFeed();
    }, [user, navigate])


    


    return (
        <div className="backgraound-color-setter">
            <div className='container'>
                <div className="row align-items-start">
                    <div className="col margin-setter">
                        <ProfileCard/>
                    </div>
                    <div className="col-6 margin-setter">
                        <NewPost setPosts={setPosts}/>
                        <hr />
                        <Feed posts={posts} setPosts={setPosts}/>
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