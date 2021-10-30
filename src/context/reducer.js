import subject_data from './subject-audio-data'

export const initialState = {
  user: null,
  playlists: ['English','History','Chemistry','Biology'],
  subject_audio: {},
  playing: false,
  item: 'English',
  curr_song: null,
  curr_song_name: null,
  curr_song_number: 0,
  curr_song_playlist: 'English',
  isloading: false
};


const reducer = (state, action) => {
  
  switch (action.type) {
    case "SET_SUBJECT_AUDIO":
      return {
        ...state,
        subject_audio: action.subject_audio,
        isloading: false
      };
    case "PLAY_NEXT":
      let playlist_length = state.subject_audio[state.curr_song_playlist].length
      let current = state.curr_song_number
      if(current === playlist_length - 1){
        current=0
      }else{
        current+=1
      }

      let currentobj = state.subject_audio[state.curr_song_playlist][current]

      return{
        ...state,
        curr_song: currentobj.audio,
        curr_song_name: currentobj.title,
        curr_song_number: current,
        playing: false,
      }
    case "PLAY_PREV":
      let prev_playlist_length = state.subject_audio[state.curr_song_playlist].length
      let prev_current = state.curr_song_number
      if(prev_current === 0){
        prev_current = prev_playlist_length-1
      }else{
        prev_current -= 1
      }

      let prevcurrentobj = state.subject_audio[state.curr_song_playlist][prev_current]

      return{
        ...state,
        curr_song: prevcurrentobj.audio,
        curr_song_name: prevcurrentobj.title,
        curr_song_number: prev_current,
        playing: false,
      }
    case "Loading":
      return {
        ...state,
        isloading: action.loading
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user
      };
    case "SET_ITEM":
      return {
        ...state,
        item: action.item
      }
    case "SET_SONG":
      return {
        ...state,
        curr_song: action.song,
        playing: false,
        curr_song_name: action.song_name,
        curr_song_number: action.song_number,
        curr_song_playlist: state.item
      }
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing
      }
    case "SET_AUDIO":
    let newplaylist = state.subject_audio
    newplaylist[action.name].push({'title':action.title,'teacher':'ajay','audio':'english1.mp3'})
    return{
      ...state,
      subject_audio: newplaylist
    }
    default:
        return state;

  };
}

export default reducer;
