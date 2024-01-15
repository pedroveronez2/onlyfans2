import React from 'react'
import './style.css'
function VIPPosts() {
  return (
    <div className="tweet-card">
    <div className="tweet-header">
      <span className="username">nome</span>
    </div>
    <div className="tweet-content">Content</div>
    <div className="tweet-actions">
      <button>Like</button>
      <button>Retweet</button>
      <button>Comment</button>
    </div>
  </div>
  )
}

export default VIPPosts;