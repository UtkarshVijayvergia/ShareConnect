import React from 'react'
import { Link } from 'react-router-dom';
import { ReactComponent as LandingMainImage } from '../../assets/images/landingPage/landingMain.svg'
import './landingPage.css'

const LandingPage = () => {
    return (
        <div>
            <div className='landing-setPage landing-div-center' alt="ShareConnect">
                <div className='divider'>
                    <div className='left-grid'>
                        
                            <h1>Welcome to ShareConnect</h1>
                            <div className="tag-line">
                                <h5>-Sharing moments, Connecting minds</h5>
                            </div>
                            <div className="intro">
                                <h4>Discover a World of Connections</h4>
                                <p>
                                    Share-Connect is a social media platform designed to connect people from all walks of life. 
                                    Whether you're looking to network professionally, make new friends, or share your passions, 
                                    our platform provides the perfect space for meaningful connections. Join our vibrant 
                                    community and explore a world of opportunities.
                                </p>
                            </div>
                            <div className="end">
                                <h4>Join the Share-Connect Community</h4>
                                <p>
                                    Ready to embark on a journey of connection and discovery? <b><Link to="/register">Sign up</Link></b> for Share-Connect today and 
                                    become part of a vibrant and diverse community. Our platform offers a range of features, 
                                    including groups, messaging, events, and more, to enhance your social experience. Let's create 
                                    meaningful connections together.
                                </p>
                            </div>
                            <div className="login-nav">
                                <h5>Already a Registered User ?</h5>
                                <div className="login-nav-btn">
                                    <Link className="btn btn-primary" to="/login">Sign In</Link>
                                </div>
                            </div>
                    </div>
                    <div className="right-grid">
                        <LandingMainImage className="landing-imageSet"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage