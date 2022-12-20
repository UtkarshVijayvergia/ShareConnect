import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const About = () => {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)

    // const userData = useSelector((state) => )
    let myStyle = {
        "paddingRight": "30px",
        "paddingLeft": "30px",        
    }
    let textStyle = {
        "textAlign": "Left",
    }
    // console.log(user);

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <div>
            <br />
            <div className='container mt-5'>
                <div className="col-10 col-md-3 mt-5" s>
                    <div className="card">
                        <h5>wertg</h5>
                        {/* <a href="C:/Users/utkar/OneDrive/Desktop/ANIME/bakugou.jpg"></a> */}
                        <img src={require('../images/profileImages/bakugou.jpg')} alt="" />
                    </div>
                </div>
            </div>
                <br /><br />
                <div style={textStyle}>
                    <p>Username: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.name}</p>
                    <p>E-mail: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.email}</p>
                </div>
        </div>
    )
}

export default About