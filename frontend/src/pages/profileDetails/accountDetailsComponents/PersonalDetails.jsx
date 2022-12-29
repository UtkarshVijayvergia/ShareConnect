import React from 'react'
import { useState } from 'react';
import './personalDetails.css'

const PersonalDetails = () => {
    const [selectedGender, setSelectedGender] = useState('');

    const [selectedDay, setSelectedDay] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');


    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };
    const handleChange = (event) => {
        setSelectedGender(event.target.value);
    };


    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };


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
                    <textarea className='bio-area' rows="6" aria-invalid="false" aria-describedby="" name="bio" placeholder="Tell us about yourself, such as what you do, what your interests are, and what you hope to get out of your courses." aria-label="About Me"></textarea>
                </div>
                <br />
                <div className='age'>
                    <p className='label-age'>Age </p>
                    <input className="age-input" type="text" id='age' name='age' pattern="^(1[0-2]|[1-9])?[0-9]$" value="" />
                </div>
                <br />
                <div className='gender'>
                    <p className='label-gender'>Gender </p>
                    <div className='gender-input'>
                        <label className='gender-padder'> <input type="radio" name='male' value="male" checked={selectedGender === 'male'} onChange={handleChange} /> Female </label>
                        <br />
                        <label className='gender-padder'> <input type="radio" name='male' value="female" checked={selectedGender === 'female'} onChange={handleChange} /> Male </label>
                        <br />
                        <label className='gender-padder'> <input type="radio" name='Rather not say' value="rather not say" checked={selectedGender === 'rather not say'} onChange={handleChange} /> Rather not say </label>
                        <br />
                        <label className='gender-padder'> <input type="radio" name='Other' value="other" checked={selectedGender === 'other'} onChange={handleChange} /> Other </label>
                    </div>
                </div>
                <br />
                <div className='birth'>
                    <p className='label-birth'>Birthday </p>
                    <div className='birth-input'>
                        <label className='birth-padder'>
                            <select className='birth-day-padder' value={selectedDay} onChange={handleDayChange}>
                                <option value="">Day</option>
                                {[...Array(31).keys()].map((i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <br />
                        <label className='birth-padder'>
                            <select className='birth-month-padder' value={selectedMonth} onChange={handleMonthChange}>
                                <option value="">Month</option>
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
                            <select className='birth-year-padder' value={selectedYear} onChange={handleYearChange}>
                                <option value="">Year</option>
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
            </div>
        </div>
    )
}

export default PersonalDetails