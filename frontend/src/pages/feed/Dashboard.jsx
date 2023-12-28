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
                <div className="row align-items-start">
                    <div className="col margin-setter">
                        <ProfileCard/>
                    </div>
                    <div className="col-6 margin-setter">
                        <Feed />
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