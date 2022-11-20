import React from 'react'
import { Link } from 'react-router-dom'
import './PostItem.css'

function PostItem({ post }) {
  const PF = "http://localhost:3001/images/"
  return (
    <div>
      <div className="post">
        {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
        <div className="postInfo">
          <Link className="link" to={`/post/${post._id}`}>
            <span className="postTitle">{post.title}</span>
          </Link>
          <div className="postCats">
            Author:-{post.username}
          </div>
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc">{post.desc}</p>
      </div>
    </div>
  )
}

export default PostItem