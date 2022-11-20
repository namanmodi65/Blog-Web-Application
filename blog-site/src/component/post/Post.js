import React from 'react'
import PostItem from '../postItem/PostItem'
import './Post.css'

function Post({posts}) {
  
  return (
    <div className="posts">
      {
        posts.map((p)=>(
          <PostItem post={p}/>
        ))
      }
    </div>
  )
}

export default Post