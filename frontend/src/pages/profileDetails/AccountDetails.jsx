import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './accountDetails.css'
import AccountIntroDetails from './accountDetailsComponents/AccountIntroDetails'
import PersonalDetails from './accountDetailsComponents/PersonalDetails'
import ImageUpload from './accountDetailsComponents/ImageUpload'

const AccountDetails = () => {
    const { user } = useSelector((state) => state.auth)

    return (
        <div className='univ'>
            {/* <ImageUpload /> */}
            <div className="cardcontainer card">
                <div className='accountDetails-header'>
                    <p className='mainHeading'>Edit My Profile</p>
                    <div className='btn-placement'>
                        <Link className='btn btn-lg btn-primary btn-edit' to={`/user/${user.name}`}>View Profile</Link>
                    </div>
                </div>
                <hr />
                <AccountIntroDetails 
                    name = {user.name}
                />
                <hr />
                <PersonalDetails 
                />
            </div>
            <br /><br />
        </div>
    )   
}

export default AccountDetails