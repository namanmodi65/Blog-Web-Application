import axios from 'axios'
import React ,{useState,useEffect}from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../header/Header'
import Post from '../post/Post'
import './Home.css'
function Home() {
  const [posts, setPosts] = useState([])
  const {search} = useLocation()
  // console.log(location)

  useEffect(() => {
    const fetchPost=async()=>{
      const res = await axios.get('http://localhost:3001/api/post/'+search)
      // console.log(res)
      setPosts(res.data)
    }
    fetchPost()
  }, [search])
  

  return (
    <>
      <Header/>
      <div className="home">
      <Post posts={posts}/>
      </div>
    </>
  )
}

export default Home