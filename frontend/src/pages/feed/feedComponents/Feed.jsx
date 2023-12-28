import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Feed = () => {
    const { user } = useSelector((state) => state.auth)
    const [feed, setFeed] = useState()
    const navigate = useNavigate([]);

    const getFeed = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/user/posts', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            setFeed(await response.json());
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        // if user not authenticated then not allowed to visit this page (Protected route)
        if (!user) {
            navigate('/login')
        }
        // get user details
        getFeed()
    }, [user, navigate])


    return (
        <div>
            <div className="card">
                <div classname="card-body">
                    {
                        feed?.map((curr) => {
                            return <div>
                                    <br />
                                    <div className="card">
                                        <h3>{ curr.title }</h3>
                                        <br />
                                        { curr.body }
                                        <br />
                                    </div>
                                    <br />
                                </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Feed