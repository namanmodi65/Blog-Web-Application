import axios from 'axios'
import React, { useEffect, useState,useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Context } from '../../context/Context'
import './SinglePost.css'

function SinglePost() {
    const [post, setPost] = useState("")
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    const PF = "http://localhost:3001/images/"
    const {user} = useContext(Context)

    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode, setUpdataMode] = useState(false)

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('http://localhost:3001/api/post/' + path)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getData()
    }, [path])

    const handleDelete= async()=>{
        try {
            await axios.delete(`http://localhost:3001/api/post/${post._id}`,{
                data:
                {username:user.username},
            })
            window.location.replace('/')

        } catch (error) {
            
        }
    }

    const handleUpdate =async ()=>{
        try {
            await axios.put(`http://localhost:3001/api/post/${post._id}`,{
                username:user.username
                ,title
                ,desc
            })
            window.location.reload()

        } catch (error) {
            
        }
    }

    return (
        <div className='singlePost-page'>
            {post.photo && <img className="postImg" src={PF+post.photo} alt="" />}
            
            {updateMode ? <input type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>:
            <div className='title'>
            <h1>{post.title}</h1>
            </div>
            }
            {post.username === user.username &&(
            <span className='icons'>
            <i className='far fa-edit icon-edit' onClick={()=>setUpdataMode(true)}></i>
            <i className='far fa-trash-alt icon-delete' onClick={handleDelete}></i>
            </span>
            )}
            <div className='username'>
                <Link to={`/?user=${post.username}`} style={{ textDecoration: 'none' }}>
                    <p>Author:-{post.username}</p>
                </Link>
            </div>
            <div className='date'>
            <span>{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updateMode?<textarea type='text' value={desc} onChange={(e)=>      {setDesc(e.target.value)}} />:
            <div className='description'> 
            <p>{post.desc}</p>
            </div>
            }
            {updateMode && <button onClick={handleUpdate}>Update</button>}
        </div>
    )
}

export default SinglePost