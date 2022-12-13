import './welcome.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

export default function User() {
    const params = useParams();
    const [post, setPosts] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(()=>{
        const username = params.username;
        axios.get("http://localhost:8000/post/" + username)
            .then((res)=>{
                console.log('get successful!');
                setPosts(res.data);
            })
            .catch(function(error){ 
                setIsError(true);
            })
            .finally(function() {
                setIsLoading(false);
            })
    },[])

    function showAllPost(){
        const posts = [];
        post.forEach((data) => {
          posts.push(createPostTag(data._id, data.content, data.username, data.created, data.updated))
        })
        return posts;
    }
    
    function createPostTag(id, content, username, create, update){
    
        return (
        <div>
            <div> id: {id}</div>
            <div>content: {content}</div>
            <div>user: {username}</div>
            <div>create: {create}</div>
            <div>update: {update}</div>
        </div>);
    }

    if (isLoading) {
        return (<div>Loading....</div>)
    }

    if(isError) {
        return (<div>Could not find User with username: {params.username}</div>)
    }


    return (
        <div className='layout'>
        <div className='navbar'>
          <div className='longer'>
            <button className="button" >
              Home
            </button>
          </div>
          <button className="button" >
            Log In
          </button>
          <button className="button" >
            Sign Up
          </button>
  
        </div>
  
        <div className='info_layout'>
          <p> {params.username}</p>
          {showAllPost()}
        </div>
  
      </ div>
    )
}