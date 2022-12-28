import React from 'react'
import './user.css'
import { Link } from 'react-router-dom'

const User = (props) => {
    return (
        <div>
            <div>
                <p className='name text-decor'>{props.name}</p>
                <p className='email text-decor'>{props.email}</p>
            </div>
            <div className='btn btn-sm btn-success'>
                <Link className='navigate' to="">Edit Profile Details</Link>
            </div>
        </div>
    )
}

export default User