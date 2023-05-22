import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Navbar from './components/Navbar';
import About from './pages/About';
import Profile from './pages/profile/Profile';
import LandingPage from './pages/LandingPage';
import Error404 from './pages/Error404';
import AccountDetails from './pages/profileDetails/AccountDetails';

function App() {
    const { user } = useSelector((state) => state.auth)

    return (
        <>
            <Router>
                <Navbar/>
                <div className="container-new">
                    <Routes>
                        <Route path='/' element={<LandingPage/>}/>
                        <Route path='/home' element={<Dashboard/>} />
                        <Route path='/login' element={<Login/>} />
                        <Route path='/register' element={<Register/>} />
                        <Route path='/contact' element={<About/>} />

                        {user?(<Route path={`user/${user.name}`} element={<Profile/>} />):<></>}
                        {user?(<Route path={`user/${user.name}/${user._id}`} element={<AccountDetails/>} />):<></>}
                        
                        <Route path='*' exact={true} element={<Error404/>} />

                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
