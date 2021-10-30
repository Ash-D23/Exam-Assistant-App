import './Teacher.css'
import {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import  { Redirect } from 'react-router-dom';
import {auth} from '../../firebase'
import Loader from '../Loader/Loader';
import {db} from '../../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Teacher(){

  const [{ playlists, user }, dispatch] = useStateValue();
  const [name,setname] = useState(null);
  const [text,settext] = useState(null);
  const [subject,setsubject] = useState(playlists[0]);
  const [isloading, setloading] = useState(true)

  const handleteach = ()=>{
    /*dispatch({
      type: "SET_AUDIO",
      title: name,
      name: subject
    })*/

    if(name=='' || text==''){
      toast.error('There was an Error', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }else{
      const post = db.ref(`/${subject}`);

      post.push().set({
        title: name,
        teacher: 'Ajay',
        audio: text
      }, (err)=> {
        if (err){
          toast.error('There was an Error', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }else{
          toast.success('Notes Added Succesfully!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
      });
    }

    setname('');
    settext('');
    
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
      setloading(false)
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
      <div className="teach">
        <div  className="teach-header">
              <Link className="header-item" to="/teacher">Create Topic</Link>
              <Link className="header-item" to="/topics">View Topics</Link>
              <p className="header-item" onClick={logout}>Logout</p>
        </div>
        <div className="teacher-container">
          <div className="teach-con">
            <h2 className="teach-title">Add Exam Notes</h2>
            <div className="teach-form">
              <label>
                  Select Subject:
              </label>
              <select name="selectList" id="selectList" onChange={(e)=> setsubject(e.target.value)}>
                {playlists?.map((item)=>(
                <option value={item}>{item}</option>
              ))}
    
              </select>
              <label>
                  Enter Topic:
              </label>
                <input type="text" value={name} name="name" onChange={(e)=> setname(e.target.value)} />
    
              <label>
                Enter Audio Link
              </label>
                <input type="text" value={text} name="audio" onChange={(e)=>settext(e.target.value)} />
            </div>
    
            <button className="btn btn-teach" onClick={handleteach}> Submit </button>
    
          </div>
        </div>
        

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>)
  }

  
  
}

export default Teacher
