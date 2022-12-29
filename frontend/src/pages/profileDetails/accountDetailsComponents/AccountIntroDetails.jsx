import React from 'react'
import { useRef } from 'react';
import './accountIntroDetails.css'

const AccountIntroDetails = (props) => {
    const fileInput = useRef(null);

    const handleClick = () => {
        fileInput.current.click();
    };

    const handleChange = e => {
        const file = e.target.files[0];
        console.log(file);
    };

    return (
        <div>
            <div className='head1'>
                <p className='head-intro'>Introduction</p>
                <p className='head-p'>Let the ShareConnect community recognize you.</p>
                <div className='info'>
                    <div className='namer'>
                        <p className='namer-name'>Name </p>
                        <input type="text" className="namer-input" id='textField1' name='textField1' value={props.name} />
                    </div>
                    <br />
                    <div className='profile-picture'>
                        <p className='namer-profile'>Profile Picture </p>
                        <div className='card accountPicContainer'>
                            <img className='accountPic' src={require('../../../images/profileImages/bakugou.jpg')} alt="" />
                        </div>
                        <div>
                            <div className='profilePic-upload'>
                                <button className='btn btn-primary btn-edit-sm' onClick={handleClick}>Choose a file</button>
                                <div className='profilePic-size'>
                                    <p>Maximum size of 1MB. JPG, JPEG, or PNG.</p>
                                </div>
                                <input type="file" ref={fileInput} onChange={handleChange} style={{ display: 'none' }} />
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    )
}

export default AccountIntroDetails