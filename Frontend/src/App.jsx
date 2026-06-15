import { useState } from 'react'
import Sidebar from "./Sidebar.jsx"

import './App.css'
import Chatwindow from './Chatwindow.jsx'
import {MyContext} from "./MyContext.jsx"
import {v1 as uuidv1} from "uuid"

function App() {
  const [prompt,setPrompt]=useState("");
  const [reply,setReply]=useState(null);
  const [currThreadId,setCurrThreadId]=useState(uuidv1());
 const [previousChat,setPreviousChat]=useState([]); // store all chats of current thread
 const [newchat,setNewChat]=useState(true);
 const [allthreads,setAllThreads]=useState([]);
 const [refreshThreads, setRefreshThreads] = useState(false);

  let providerValues={
    prompt,setPrompt,reply,setReply,currThreadId,setCurrThreadId,newchat,setNewChat,previousChat,setPreviousChat,allthreads,setAllThreads,refreshThreads,setRefreshThreads
  }; // passing values

  return (
    <div className='main'>

      <MyContext.Provider value={providerValues}>
      <Sidebar></Sidebar>

      <Chatwindow></Chatwindow>

    </MyContext.Provider>


    </div>
  )
}

export default App
