import React from 'react'
import './user.css'
import { Link } from 'react-router-dom'

const User = (props) => {
    return (
        <div>
            <div className='text-decor'>
                <p className='name'>{props.name}</p>
                <p className='email'>{props.email}</p>
            </div>
            <div className='btn btn-sm btn-success'>
                <Link className='navigate' to={`/user/${props.name}/${props._id}`}>Edit Profile Details</Link>
            </div>
        </div>
    )
}

export default User