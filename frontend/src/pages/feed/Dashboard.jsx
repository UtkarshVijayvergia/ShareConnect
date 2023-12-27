import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileCard from './feedComponents/ProfileCard'
import Feed from './feedComponents/Feed'
import AdsCard from './feedComponents/AdsCard'
import './dashboard.css'


const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
    }, [user, navigate])


    return (
        <div className="backgraound-color-setter">
            {/* { user ? (<> <br /><br />{user.name}<br />{user.email}<br /><br /><p>qwerty</p></>) : (<>nothing to display</>) } */}
            <div className='container'>
                <div class="row align-items-start">
                    <div class="col margin-setter">
                        <ProfileCard/>
                    </div>
                    <div class="col-6 margin-setter">
                        <Feed />
                    </div>
                    <div class="col margin-setter">
                        <AdsCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard