import './welcome.css';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';


export default function Welcome() {
  const [test, setTest] = useState([{}]);

  useEffect(() => {
    Axios.get('http://localhost:8000/post')
      .then((res) => {
        console.log('get successful!');
        setTest(res.data);
      })
      .catch(console.log('here???'));
  }, []);

  console.log(test);

  function showAllPost(){
    const posts = [];
    test.forEach((data) => {
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

  // if I post something on the backend using postman, could that also trigger a
  // rerender in the front page

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
        <p> Project 3</p>
        {showAllPost()}
      </div>

    </ div>
  );
}
