import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import About from './pages/About';
import LandingPage from './pages/LandingPage';

function App() {
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
                        <Route path='/about' element={<About/>} />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
