import React,{useEffect, useState } from 'react'
import { useStateValue } from "../../context/StateProvider";
import {db} from '../../firebase';
import {Link} from "react-router-dom";
import './Topics.css'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {auth} from '../../firebase'
import Loader from '../Loader/Loader';
import  { Redirect } from 'react-router-dom';

function Topics() {
    const [{ subject_audio, playlists, user }, dispatch] = useStateValue();

    const [isloading, sertloading] = useState(true)

    const [topictype, settopictype] = useState('English')

    useEffect(()=>{
        
        const word = db.ref('/');
        const subject_audio = {}
        word.on('value', (data)=>{
          const audio = data.val();
          for (let subject in audio){
            let arr = []
            
            for (const [key, value] of Object.entries(audio[subject])) {
                let newobj = {}
                newobj['key']=key
                arr.push({...newobj, ...value})
              }
            subject_audio[subject]=arr
          }

          dispatch({
            type: "SET_SUBJECT_AUDIO",
            subject_audio: subject_audio
          })

          sertloading(false)
          
        })
    
        
        }
      , [])

    const handleDelete = (keyid)=>{

        let docRef = db.ref(`/${topictype}/${keyid}`);
        docRef.remove()
    }

    useEffect(() => {
      auth.onIdTokenChanged(function(user) {
        if (user) {
          // User is signed in or token was refreshed.
          dispatch({
            type: "SET_USER",
            user: user.email
        })
        }
      })
    }, [])
  
    const logout = async ()=>{
      await auth.signOut()
      dispatch({
        type: "SET_USER",
        user: null
      })
  
    }

    if(isloading){
      return <Loader />
    }else{

    return !user ? (<Redirect to="/login" />) : (
        <div className="topic-container">
            <div className="teach-header">
              <Link className="header-item" to="/teacher">Create Topic</Link>
              <Link className="header-item" to="/topics">View Topics</Link>
              <p className="header-item" onClick={logout}>Logout</p>
            </div>

            <div className="topic-section">
              <div className="topic">
                <h2 className="topic-head"> Select Topic </h2>
                <select name="selectList" id="selectList" onChange={(e)=> settopictype(e.target.value)}>
                      {playlists?.map((item)=>(
                      <option value={item}>{item}</option>
                    ))}
          
                    </select>
                    <div className="topic-rows">
                    {
                      subject_audio == {} ? (null) : ( subject_audio[topictype]?.map((item)=>{
                            return (<div className="topic-row"> 
                                <p>{item.title}</p>
                                <DeleteOutlineIcon onClick={() => handleDelete(item.key)} color="secondary" />
                            </div>)
                        })
                      )
                    }
                    </div>
              </div>
            </div>

          
        </div>
    )
  }
}

export default Topics
