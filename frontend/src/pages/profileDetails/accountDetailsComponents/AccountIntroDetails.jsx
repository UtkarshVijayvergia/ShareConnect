import React from 'react'
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import './accountIntroDetails.css'

const AccountIntroDetails = (props) => {
    const { user } = useSelector((state) => state.auth)
    const fileInput = useRef(null);


    const [imageUrl, setImageUrl] = useState(null);


    // Get user profile pic
    const getImage = async () => {
        try{
            const response = await fetch(`http://localhost:5000/api/user/profilepic/${user._id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            return url;
        }
        catch(error){
            console.log(error);
        }
    }


    useEffect(() => {
        (async () => {
            const url = await getImage();
            setImageUrl(url);
        })();
    }, []);


    const handleClick = () => {
        // console.log("clicked");
        fileInput.current.click();
    };

    // const formData = new FormData();
    const handleChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('otherData', 'some value');
        // console.log(formData.get('file'));
        await fetch(`http://localhost:5000/api/user/profilepic/${user._id}`, {
            method: "POST",
            headers:{
                Authorization: `Bearer ${user.token}`,
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            },
            body: formData,
            // body: JSON.stringify(formData),
            // JSON.stringify({
            //     name: file.name,
            //     image: {
            //         data: file.name,
            //         contentType: file.type,
            //     }
            // })
        })
        // console.log("changed");
    };

    // const submit = async (e) => {
    //     e.preventDefault();
    //     const file = e.target.files[0];
    // }

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
                        {/* src={require('../../../images/profileImages/bakugou.jpg')} */}
                            <img className='accountPic' src={imageUrl} alt="Profile Picture" />
                        </div>
                        <div>
                            <div className='profilePic-upload'>
                                <button className='btn btn-primary btn-edit-sm' onClick={handleClick}>Choose a file</button>
                                <div className='profilePic-size'>
                                    <p>Maximum size of 1MB. JPG, JPEG, or PNG.</p>
                                </div>
                                <input type="file" ref={fileInput} onChange={handleChange} style={{ display: 'none' }} />
                                {/* <button className='btn btn-sm btn-primary' onChange={submit}>change</button> */}
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