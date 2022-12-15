import './welcome.css';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import Layout from './Layout';

export default function User() {
    const params = useParams();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(()=>{
        const username = params.username;
        axios.get("http://localhost:8000/post/" + username)
            .then((res)=>{
                console.log('get successful!');
                setPosts(res.data);
            })
            .catch(function(error){ 
                console.log('rejected!!!')
                setIsError(true);
            })
            .finally(function() {
                console.log('loading')
                setIsLoading(false);
            })

        axios.get('http://localhost:8000/user/isLoggedIn')
            .then((res) => {
              setIsLogin(true);
            }).catch((err) => {
              console.log("no one logged in yet!")
            })
    },[])

    if (isLoading) {
        return (<div>Loading....</div>)
    }

    if(isError) {
        return (<div>Could not find User with username: {params.username}</div>)
    }


    return (
      <Layout value={{posts, isLogin, setIsLogin}}/>
    )
}