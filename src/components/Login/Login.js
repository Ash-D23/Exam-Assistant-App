import Field from './Field.js'
import React from 'react';
import { useStateValue } from "../../context/StateProvider";
import  { Redirect, Link } from 'react-router-dom'
import './Login.css';
import { auth } from "../../firebase"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [{ user }, dispatch] = useStateValue();

    const emailref = React.useRef();
    const passwordref = React.useRef();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        
        const email =  emailref.current.value
        const password =  passwordref.current.value
        
        try{
        let res = await auth.signInWithEmailAndPassword(email, password)
        console.log("auth ", res)

       dispatch({
            type: "SET_USER",
            user: res.user.email
        })
        }catch{
            console.log("error")
            toast.warn('There was an Error', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                });
        }

    }

    return user ? (<Redirect to="/teacher" />) : (
        <div className="login-main">
            
            <form className="login-form" onSubmit={handleSubmit} >
                <h2 className="login-title"> Login </h2>
                <Field ref={emailref} label="Email" type="email" />

                <Field ref={passwordref} label="Password" type="password" />

                <button className="btn" type="submit">Login</button>

                <Link to="/" className="login-link">Go Back</Link>
            </form>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
            />
        </div>
    )
}

export default Login