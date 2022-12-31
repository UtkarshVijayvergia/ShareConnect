import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './personalDetails.css'

const PersonalDetails = () => {
    const [userDetails, setuserDetails] = useState([{
        bio: "",
        age: "",
        gender: "",
        birth: {
            day: "",
            month: "",
            year: "",
        },
        country: "",
        state: "",
        city: "",
        phone: "",
    }])
    const [buttonText, setButtonText] = useState('Submit');
    const [buttonColor, setButtonColor] = useState('green');
    const [afterButtonText, setAfterButtonText] = useState('');
   
    
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)
    
    
    // Get user details
    const getUserDetails = async () => {
        try{
            const response = await fetch(`http://localhost:5000/api/user/details/${user._id}`,{
                method: "GET",
                headers:{
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            })
            setuserDetails(await response.json());
        }
        catch(error){
            console.log(error);
        }
    }
    
    
    const birth = {
        day: userDetails[0].birth.day!=null? userDetails[0].birth.day : {},
        month: userDetails[0].birth.month!=null? userDetails[0].birth.month : {},
        year: userDetails[0].birth.year!=null? userDetails[0].birth.year : {},
    };
    const { bio, age, gender, country, state, city, phone } = userDetails[0]!=null ? userDetails[0] : {};


    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setuserDetails([{ ...userDetails[0], [name]: value }])
    }
    const onChangeBirth = (e) => {
        setuserDetails([{ ...userDetails[0], ['birth']: { ...userDetails[0].birth, [e.target.name]: e.target.value } }])
    }

    
    const handleClick = () => {
        // Change the text of the button to "Saving..." and the color to "green"
        setButtonText('Saving...');
        setButtonColor('grey');
    
        // Set a timeout to run the following function after 1 second (1000 milliseconds)
        setTimeout(() => {
          // Change the text of the button back to "Submit" and the color back to "blue"
          setButtonText('Submit');
          setButtonColor('green');
          setAfterButtonText('Your changes were successfully saved.')
        }, 1000);
    };


    const submit = async (e) => {
        e.preventDefault();
        handleClick()
        await fetch(`http://localhost:5000/api/user/details/${user._id}`, {
            method: "POST",
            headers:{
                Authorization:  `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bio, age, gender, birth, country, state, city, phone })
        })
    }


    useEffect(() => {
        // if user not authenticated then not allowed to visit this page (Protected route)
        if (!user) {
            navigate('/login')
        }
        // get user details
        getUserDetails()
    }, [user, navigate])


    return (
        <div>
            <br />
            <div className='head2'>
                <p className='head-personal'>Details About You</p>
                <p className='head-para'>Introduce yourself to the ShareConnect community. Connect with people like you to grow your network.</p>
            </div>
            <div className='info'>
                <div className='bio'>
                    <p className='label-bio'>About Me </p>
                    <textarea className='bio-area' rows="6" aria-invalid="false" aria-describedby="" name="bio" value={bio} placeholder="Tell us about yourself, such as what you do or what your interests are" aria-label="About Me" onChange={onChange}></textarea>
                </div>
                <br />
                <div className='age'>
                    <p className='label-age'>Age </p>
                    <input className="age-input" type="text" id='age' name='age' pattern="^(1[0-2]|[1-9])?[0-9]$" value={userDetails.age? userDetails.age : age} onChange={onChange}/>
                </div>
                <br />
                <div className='gender'>
                    <p className='label-gender'>Gender </p>
                    <div className='gender-input'>
                        <label className='gender-padder'> 
                            <input type="radio" name='gender' value="female" checked={gender === 'female'} onChange={onChange} /> Female 
                        </label>
                        <br />
                        <label className='gender-padder'> 
                            <input type="radio" name='gender' value="male" checked={gender === 'male'} onChange={onChange} /> Male 
                        </label>
                        <br />
                        <label className='gender-padder'> 
                            <input type="radio" name='gender' value="rather not say" checked={gender === 'rather not say'} onChange={onChange} /> Rather not say 
                        </label>
                        <br />
                        <label className='gender-padder'> 
                            <input type="radio" name='gender' value="other" checked={gender === 'other'} onChange={onChange} /> Other 
                        </label>
                    </div>
                </div>
                <br />
                <div className='birth'>
                    <p className='label-birth'>Birthday </p>
                    <div className='birth-input'>
                        <label className='birth-padder'>
                            <select className='birth-day-padder' name='day' value={birth.day} onChange={onChangeBirth}>
                                <option value=""> Day</option>
                                {[...Array(31).keys()].map((i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <br />
                        <label className='birth-padder'>
                            <select className='birth-month-padder' name='month' value={birth.month} onChange={onChangeBirth}>
                                <option value=""> Month</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </label>
                        <br />
                        <label className='birth-padder'>
                            <select className='birth-year-padder' name='year' value={birth.year} onChange={onChangeBirth}>
                                <option value=""> Year</option>
                                {[...Array(100).keys()].map((i) => (
                                    <option key={2020 - i} value={2020 - i}>
                                        {2020 - i}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>
                </div>
                <br />
                <div className='country'>
                    <p className='label-country'>Country </p>
                    <input className="country-input" type="text" id='country' name='country' value={country} onChange={onChange}/>
                </div>
                <br />
                <div className='state'>
                    <p className='label-state'>State </p>
                    <input className="state-input" type="text" id='state' name='state' value={state} onChange={onChange}/>
                </div>
                <br />
                <div className='city'>
                    <p className='label-city'>City </p>
                    <input className="city-input" type="text" id='city' name='city' value={city} onChange={onChange}/>
                </div>
                <br />
                <div className='phone'>
                    <p className='label-phone'>Phone </p>
                    <input className="phone-input" type="text" id='phone' name='phone' pattern='^\d{10}$' placeholder='ex 123 456 7890' value={phone} onChange={onChange}/>
                </div>
                <br />
                <br />
                <hr />
                <br /><br />
                <p className='profileDetails-warning'>Note: Discussion forum posts will always show your name and profile image to other people. They can also see your detail information if you want to show them by turning on details Privacy in advanced settings. Read our Privacy Policy to learn more.</p>
                <div className="profile-btn-place">
                    <button tabindex="-1" type="submit" className="btn btn-lg btn-primary btn-editor" style={{backgroundColor: buttonColor}} onClick={submit}>{buttonText}</button>
                </div>
                <br />
                <p className='profileDetails-warning'>{afterButtonText}</p>
                <br />
            </div>
        </div>
    )
}

export default PersonalDetails