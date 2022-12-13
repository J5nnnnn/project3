import './welcome.css';
import './modal.css';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { set } from 'mongoose';


export default function Welcome() {
  const [test, setTest] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    Axios.get('http://localhost:8000/post')
      .then((res) => {
        console.log('get successful!');
        setTest(res.data);
      })
      .catch(function(error){ 
        console.log('rejected!!!')
        setIsError(true);
    })
    .finally(function() {
        setIsLoading(false);
    })
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

  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  function onClick_register() {
    setModal(!modal);
  }

  function updateName(event){
    setName(event.target.value);
  }

  function updatePassword(event){
    setPassword(event.target.value);
  }

  function createUser(){
    Axios.post("http://localhost:8000/user/register",{
      username: name,
      password: password,
    })
    .then((res) => {
      setModal(!modal);
      setName('');
      setPassword("");
      res.send("successful register!");
    })
    .catch()
  }
  console.log(name + password)

  // if I post something on the backend using postman, could that also trigger a
  // rerender in the front page

  if (isLoading) {
    return (<div>Loading....</div>)
  }

  if(isError) {
    return (<div>Unable to load!</div>)
  }

  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={onClick_register} className="overlay"></div>
          <div className="modal-content">
            <h2>Register</h2>
            <div>
              <label>Username: </label>
              <input type="text" onInput={updateName}></input>
            </div>
            <div>
              <label>Password:  </label>
              <input type="password" onInput={updatePassword}></input>
            </div>
            <button className="close-modal" onClick={onClick_register}>
              CLOSE
            </button>
            <button className="mid-modal" onClick={createUser}>
              Submit
            </button>
          </div>
        </div>
      )}
      
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
          <button className="button" onClick={onClick_register} >
            Sign Up
          </button>

        </div>

        <div className='info_layout'>
          <p> Project 3</p>
          {showAllPost()}
        </div>
      </ div>
    
    </>

  );
}
