import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const About = () => {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)
    const [usertrys, setUsertrys] = useState([])
    
    // Get user trys
    const getuserTrys = async () => {
        try{
            const response = await fetch(`/api/usertry/${user._id}`)
            setUsertrys(await response.json());
        }
        catch(error){
            console.log(error);
        }
    } 


    // const userData = useSelector((state) => )
    let myStyle = {
        "paddingRight": "10px",
        "paddingLeft": "10px",
        "height" : "250px",
        "width" : "250px",
    }
    let textStyle = {
        "paddingRight": "20px",
        "paddingLeft": "20px",
        "textAlign": "Left",
    }
    // console.log(user);
    // console.log(usertrys);
    

    // get user login data
    useEffect(() => {
        // if user not authenticated then not allowed to visit this page (Protected route)
        if (!user) {
            navigate('/login')
        }
        // get user trys
        else{
            getuserTrys()
        }
    }, [user, navigate])


    return (
        <div>
            <br />
            <div className='container mt-5'>
                <div className="col-10 col-md-3 mt-5" style={myStyle}>
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
                    <p>TextField1: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{usertrys[0] ? usertrys[0].textField1 : <span>NA</span>}</p>
                    <p>TextField2: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{usertrys[0] ? usertrys[0].textField2 : <span>NA</span>}</p>
                    <p>TextField3: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{usertrys[0] ? usertrys[0].textField3 : <span>NA</span>}</p>
                </div>
        </div>
    )
}

export default About