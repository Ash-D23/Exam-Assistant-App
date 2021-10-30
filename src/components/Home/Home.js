import React from "react";
import { useStateValue } from "../../context/StateProvider";
import './Home.css'
import {Link} from "react-router-dom";

function Home() {

  return (
    <div className="home">
      <h1>Welcome to Exam Assistant</h1>
      <div className="btn-wrap">
        <Link to="/student"><button className="btn"> Student's Page </button></Link>
        <Link to="/teacher"><button className="btn"> Teacher's Page </button></Link>
      </div>
    </div>
  )

}

export default Home;
