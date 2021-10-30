import React from "react";
import './Sidebar.css';
import {Link} from 'react-router-dom';
import { useStateValue } from "../../context/StateProvider";
import SidebarOption from '../SidebarOption/SidebarOption'

function Sidebar() {
  const [{ playlists }, dispatch] = useStateValue();

  return (
    <div className="sidebar">
      <Link to="/" className="homelink" ><h2 className="head">Exam Assistant</h2></Link>
      <strong className="sidebar__title">PLAYLISTS</strong>
      <hr />
      {playlists?.map((playlist) => (
        <SidebarOption option={playlist} />
      ))}
    </div>
  )

}

export default Sidebar
