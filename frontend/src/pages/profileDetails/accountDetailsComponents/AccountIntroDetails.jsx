import React from 'react'
import './accountIntroDetails.css'

const AccountIntroDetails = (props) => {
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
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountIntroDetails