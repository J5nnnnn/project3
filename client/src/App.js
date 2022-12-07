import './App.css';
import React , {useEffect, useState} from 'react';
import Axios from "axios";

function App() {

  const [test, setTest] = useState([{}]);

  useEffect(()=>{
      Axios.get("http://localhost:8000/post")
        .then((res)=>{
            console.log("get successful!")
            setTest(res.data)
        }).catch(
          console.log("here???")
        )
  }, [])

  console.log(test[0])

  return (
    <div>
        <p> Project 3</p>
        <div>
          id : {test[1] === undefined? null: test[1]._id}
        </div>
        <div>
          name: {test[0].content}
        </div>
        <div>
          user: {test[0].username}
        </div>
    </div>
  );
}

export default App;
