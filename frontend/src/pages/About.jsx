import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const About = () => {

    const [usertrys, setUsertrys] = useState([{
        textField1: "",
        textField2: "",
        textField3: "",
    }])
    
    
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)
    
    
    // Get user trys
    const getuserTrys = async () => {
        try{
            const response = await fetch(`http://localhost:5000/api/usertry/${user._id}`)
            setUsertrys(await response.json());
        }
        catch(error){
            console.log(error);
        }
    } 
    
    const { textField1, textField2, textField3 } = usertrys[0]!=null ? usertrys[0] : {};
    
    const onChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUsertrys([{ ...usertrys[0], [name]: value }])
    }
    
    
    const onSubmit = async (e) => {
        e.preventDefault();
        
        await fetch(`http://localhost:5000/api/usertry/${user._id}`, {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({textField1, textField2, textField3})
        })
        console.log("User Registered Succesfully");
    }
    
        
    // get user login data
    useEffect(() => {
        // if user not authenticated then not allowed to visit this page (Protected route)
        if (!user) {
            navigate('/login')
        }
        // get user trys
        getuserTrys()
    }, [user, navigate])

    
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


    return(
        <div>
            <br />
            <div className='container mt-5'>
                <div className="col-10 col-md-3 mt-5" style={myStyle}>
                    <div className="card">
                        <h5>wertg</h5>
                        <img src={require('../images/profileImages/bakugou.jpg')} alt="" />
                    </div>
                </div>
            </div>
            <br />
            <div style={textStyle}>
                <p>Username: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.name}</p>
                <p>E-mail: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{user.email}</p>   
                <form onSubmit={onSubmit}>
                    <div className="form-group login-textarea-control">
                        <input type="text" className="form-control" id='textField1' name='textField1' value={textField1} onChange={onChange}/>
                    </div>
                    <div className="form-group login-textarea-control">
                        <input type="text" className="form-control" id='textField2' name='textField2' value={textField2} onChange={onChange}/>
                    </div>
                    <div className="form-group login-textarea-control">
                        <input type="text" className="form-control" id='textField3' name='textField3' value={textField3} onChange={onChange}/>
                    </div>

                    <div className="form-group login-textarea-control login-button-padding-control">
                        <button type="submit" className="btn btn-block">Submit  </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default About