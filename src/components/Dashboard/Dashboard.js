import Body from '../Body/Body'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'
import './Dashboard.css'
import { useStateValue } from "../../context/StateProvider";
import {useRef, useEffect} from 'react';
import {db} from '../../firebase';
import Loader from '../Loader/Loader';

function Dashboard() {

  const [{ curr_song,playing, isloading }, dispatch] = useStateValue();
  
  const audioRef = useRef(new Audio(`${curr_song}`));

  useEffect(()=>{
    if(playing){
      audioRef.current.play()
    }else{
      audioRef.current.pause()
    }
  },[playing])

  useEffect(()=>{
    audioRef.current.pause()
    audioRef.current = new Audio(`${curr_song}`)
  },[curr_song])

  useEffect(()=>{
    dispatch({
      type: "Loading",
      loading: true
    })
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
    })

    
    }
  , [])

  return isloading ? (<Loader /> ) : (
    <div className="dashboard">
      <div className="dashboard-body">
        
        <Sidebar />
        <Body />
      </div>
      <Footer />
    </div>
  )

}

export default Dashboard
