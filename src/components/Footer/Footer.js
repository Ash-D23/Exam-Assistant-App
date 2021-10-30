import './Footer.css'
import { useStateValue } from "../../context/StateProvider";
import "./Footer.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";

function Footer() {

  const [{ curr_song_name,playing }, dispatch] = useStateValue();

  const handlePlayPause = () => {
   if (playing) {
    
     dispatch({
       type: "SET_PLAYING",
       playing: false,
     });
   } else {

     dispatch({
       type: "SET_PLAYING",
       playing: true,
     });
   }
 };

 const playnext = ()=>{
  dispatch({
    type: "PLAY_NEXT"
  });
 }

 const playprev = ()=>{
  dispatch({
    type: "PLAY_PREV"
  })
 }


  return (
    <div className="footer">
      <div className="footer__left">

        <div className="footer__songInfo">
          {curr_song_name ? curr_song_name: null}
        </div>
      </div>

      <div className="footer__center">
      <SkipPreviousIcon onClick={playprev} className="footer__icon" />
      {playing ? (
        <PauseCircleOutlineIcon
          onClick={handlePlayPause}
          fontSize="large"
          className="footer__icon"
        />
      ) : (
        <PlayCircleOutlineIcon
          onClick={handlePlayPause}
          fontSize="large"
          className="footer__icon"
        />
      )}
      <SkipNextIcon onClick={playnext} className="footer__icon" />
      </div>

    </div>
  )

}

export default Footer
