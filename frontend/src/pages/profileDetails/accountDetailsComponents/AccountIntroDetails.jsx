import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './accountIntroDetails.css'

const AccountIntroDetails = (props) => {
    const { user } = useSelector((state) => state.auth)

    const [profilePicUrl, setProfilePicUrl] = useState();
    const [profilePic, setProfilePic] = useState();


    // Get user profile pic
    const getImage = async () => {
        try{
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
        catch(error){
            console.log(error);
        }
    }

    // Get user profile pic - UseEffect
    useEffect(() => {
        const fetchImageUrl = async () => {
          const url = await getImage();
          setProfilePicUrl(url);
        };
      
        fetchImageUrl();
    }, []);


    // Read contents of Profile pic
    const handleChange = (e) => {
        const newProfilePic = e.target.files[0];
        const reader = new FileReader();
      
        reader.onloadend = () => {
            setProfilePic(newProfilePic);
        };
      
        if(newProfilePic){
            reader.readAsDataURL(newProfilePic);
        }
    };


    // Change profile pic
    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profilePic', profilePic);

        const response = await fetch(`http://localhost:5000/api/user/profilepic/${user._id}`, {
            method: "POST",
            body: formData,
            headers:{
                Authorization: `Bearer ${user.token}`,
                // 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            },
        })
        
        if (!response.ok) {
            console.error(response.statusText);
        } 
        else {
            await response.json();
            const updatedImageUrl = await getImage();
            setProfilePicUrl(updatedImageUrl);
        }
    };


    return (
        <div>
            <div className='head1'>
                <p className='head-intro'>Introduction</p>
                <p className='head-p'>Let the ShareConnect community recognize you.</p>
                <div className='info'>
                    <div className='namer'>
                        <p className='namer-name'>Name </p>
                        <input type="text" className="namer-input" id='textField1' name='textField1' value={props.name} readOnly />
                    </div>
                    <br />
                    <div className='profile-picture'>
                        <p className='namer-profile'>Profile Picture </p>
                        <div className='card accountPicContainer'>
                            <img className='accountPic' src={profilePicUrl} alt="Profile Picture" />
                        </div>
                        <div>
                            <form encType="multipart/form-data">
                                <div className='profilePic-upload'>
                                    <div className='profilePic-size'>
                                        <p>
                                            Maximum size of 1MB. JPG, JPEG, or PNG.
                                        </p>
                                    </div>
                                    <input type="file" name="profilePic" onChange={handleChange}  />
                                    <br />
                                    <button onClick={submit} className='btn btn-sm btn-primary'>change</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br />
                </div>
            </div>
        </div>
    )
}

export default AccountIntroDetails