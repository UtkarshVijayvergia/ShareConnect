import React from 'react'
import './recentPosts.css'

const RecentPosts = () => {
  return (
    <div>
        <div className="heading">
            <p>
                Recent Posts
            </p>
        </div>
        <div className="card cardContainer">
            <div className="postContainer">
                No recent activity
            </div>
        </div>
        <br /><br />
    </div>
  )
}

export default RecentPosts