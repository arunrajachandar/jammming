import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import './App.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [],
playlistName : 'My playlist',
playlistTracks: [],
term: '', 
profileDet :''
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.search = this.search.bind(this)
    this.savePlayList = this.savePlayList.bind(this)
  }



addTrack(track){
  let tracks = this.state.playlistTracks;
    if(tracks.find( savedTrack => savedTrack.id === track.id)){
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks,
    searchResults: this.state.searchResults.filter(currTrack => currTrack.id !== track.id)})
}
removeTrack(track){
  let tracks = this.state.playlistTracks;
  tracks = tracks.filter(currTrack => currTrack.id !== track.id);
  let srTracks = this.state.searchResults;
  srTracks.unshift(track)
  this.setState({playlistTracks: tracks,
  searchResults: srTracks})
}
updatePlaylistName(name){
  this.setState({playlistName: name});
}

search(name){
  if(name){
 Spotify.search(name).then(searchResults => {
      this.setState({searchResults: searchResults})

    });

  }else{
    this.setState({searchResults: [] })
  }
  }
  

savePlayList(){
  const trackUris = this.state.playlistTracks.map(track => track.uri)
 if(trackUris.length ===0){
  store.addNotification({
    message: "Add songs to the playlist",
    type: "warning",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: false
    }
  })

 }else{
  Spotify.savePlaylist(this.state.playlistName, trackUris)
  .then(()=>{
    store.addNotification({
      message: `${this.state.playlistName} Added`,
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: false
      }
    });
  
    this.setState({
      
    playlistName: '',
    playlistTracks:[]})
  
  })
  
 }
}

componentDidMount(){
  Spotify.userProfile().then(res=> this.setState({profileDet: res.display_name}))
}
render(){
  
  let userName;
  
  if(this.state.profileDet){
    userName = <div className="userDetail">Hi, {this.state.profileDet}</div>
  }
    
  return (
      <div>
         <ReactNotification />
        <div className ="header">
          <div className="head">
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
      {userName}

          </div>
 
        </div>
      <div className="App">
        
        <SearchBar onChange = {this.search}/>
        {/* {this.userProfile()} */}
      <div className="App-playlist">
          <SearchResults onAdd = {this.addTrack} searchResults = {this.state.searchResults}/>
          <PlayList onSave = {this.savePlayList} onNameChange = {this.updatePlaylistName} onRemove = {this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
        </div>
      </div>
    </div>
    );
  }
}
 


export default App;
