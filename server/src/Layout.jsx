import './welcome.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

export default function Layout(props) {
    const navigate = useNavigate();

    const posts = props.value.posts;
  
    console.log(posts)

    function showAllPost(){
      const postlist = [];
      posts.forEach((data) => {
        postlist.push(createPostTag(data._id, data.content, data.username, data.created, data.updated))
      })
      return postlist;
    }
  
    function createPostTag(id, content, username, create, update){
  
      return (
      <div>
        <div> id: {id}</div>
        <div>content: {content}</div>
        <div className='name_display' onClick={() => onClick_visit_user(username)}>
            @{username}
        </div>
        <div>create: {create}</div>
        <div>update: {update}</div>
      </div>);
    }
  
    const [modal, setModal] = useState(false);
    const [modal_register_success, setModal_register_success] = useState(false);
  
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
  
    function onClick_reg_success(){
      setModal_register_success(!modal_register_success);
      setName('');
    }
  
    function onClick_home(){
      navigate("/");
    }
  
    function onClick_register() {
      setModal(!modal);
    }
  
    function updateName(event){
      setName(event.target.value);
    }
  
    function updatePassword(event){
      setPassword(event.target.value);
    }

    function onClick_visit_user(input_name){
        navigate("/" + input_name);
    }
  
    function createUser(){
      axios.post("http://localhost:8000/user/register",{
        username: name,
        password: password,
      })
      .then((res) => {
        setModal(!modal);
        setPassword("");
        setModal_register_success(!modal_register_success);
        // res.send("successful register!");
      })
      .catch((err) => {
        console.log(err)
      })
    }

    console.log(name + password)
  
    // if I post something on the backend using postman, could that also trigger a
    // rerender in the front page
  

  
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
        
        {modal_register_success && (
          <div className="modal">
            <div onClick={onClick_reg_success} className="overlay"></div>
            <div className="modal-content">
              <h2>Successfully Register for {name} !</h2>
              <button className="close-modal" onClick={onClick_reg_success}>
                CLOSE
              </button>
            </div>
          </div>
        )}
  
        <div className='layout'>
          <div className='navbar'>
            <div className='longer'>
              <button className="button" onClick={onClick_home}>
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