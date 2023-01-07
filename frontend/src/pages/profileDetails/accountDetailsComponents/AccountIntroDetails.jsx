import React from 'react'
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import './accountIntroDetails.css'

const AccountIntroDetails = (props) => {
    const { user } = useSelector((state) => state.auth)
    // const fileInput = useRef(null);


    const [imageUrl, setImageUrl] = useState(null);
    const [imageFile, setImageFile] = useState({});


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


    useEffect(() => {
        (async () => {
            const url = await getImage();
            setImageUrl(url);
        })();
    }, []);


    // const handleClick = () => {
    //     fileInput.current.click();
    // };

    const handleChange = e => {
        const file = e.target.files[0];
        setImageFile(file);
        // reader.readAsDataURL(file);
        // console.log(file.type);
    };

    const submit = async (e) => {
        e.preventDefault();
        // const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', imageFile);
        // formData.append('otherData', 'some value');
        console.log(formData.get('file'));
        console.log("try");
        const response = await fetch(`http://localhost:5000/api/user/profilepic/${user._id}`, {
            method: "POST",
            body: formData,
            headers:{
                Authorization: `Bearer ${user.token}`,
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
            },
            // data: formData,
        })
        if (!response.ok) {
            console.error(response.statusText);
        } 
        else {
            const data = await response.json();
            console.log(data);
        }
    };

        // console.log("qwertyujhbv");
    // }

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
                        {/* src={require('../../../images/profileImages/bakugou.jpg')} */}
                            <img className='accountPic' src={imageUrl} alt="Profile Picture" />
                        </div>
                        <div>
                            <form onSubmit={submit}>
                                <div className='profilePic-upload'>
                                    {/* <button className='btn btn-primary btn-edit-sm' onClick={handleClick}>Choose a file</button> */}
                                    <div className='profilePic-size'>
                                        <p>Maximum size of 1MB. JPG, JPEG, or PNG.</p>
                                    </div>
                                    <input type="file" onChange={handleChange}  />
                                    <br />
                                    <button className='btn btn-sm btn-primary'>change</button>
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