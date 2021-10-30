import './Body.css'
import { useStateValue } from "../../context/StateProvider";
import SongRow from '../SongRow/SongRow'

function Body() {
  const [{ item,subject_audio }, dispatch] = useStateValue();

  const playSong = (id, name, index)=>{
    dispatch({
      type: "SET_SONG",
      song: id,
      song_name: name,
      song_number: index
    });
  }
  return (
    <div className="body">
      <div className="body__infoText">

          <h2>View {item} Playlist</h2>
          <p>View the {item} audio notes added by your teachers</p>

      </div>
      <hr />
      <div className="body__songs">
        {subject_audio[item]?.map((i, index) => (
          <SongRow key={i.title} playSong={playSong} item={i} index={index} />
        ))}
      </div>

    </div>
  )

}

export default Body
