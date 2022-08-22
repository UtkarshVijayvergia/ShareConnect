import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const About = () => {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    // const userData = useSelector((state) => )
    console.log(user);

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <div>
            <h1>Hey</h1>
        </div>
    )
}

export default About