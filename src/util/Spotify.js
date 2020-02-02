import axios from 'axios';
// const clientId ='42b83fe4e16f4244bd6e9947035f8a95';
// const redirectURI ='http://localhost:3000/';
// let accessToken;

//  const Spotify ={
//     getAccessToken(){
//         if(accessToken){
//             return accessToken;
//         }
//         const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
//         const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
//         if(accessTokenMatch && expiresInMatch){
//             accessToken = accessTokenMatch[1];
//             const expiresIn = Number(expiresInMatch[1]);
//             window.setTimeout(() => accessToken = '', expiresIn);
//             window.history.pushState('Access Token', null, '/');
//             return accessToken
//         }else{
//                 const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
//             window.location  = accessUrl;
//         }
//     },    userProfile(){
//         const accessToken = Spotify.getAccessToken();
//         const headers = {Authorization: `Bearer ${accessToken}`};
//         return fetch('https://api.spotify.com/v1/me',{headers: headers}).then(res => res.json())
        
//     },
//     search(term){
//         const accessToken = Spotify.getAccessToken();
//         return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
//         {
//             headers: {
//                 Authorization : `Bearer ${accessToken}`
//             }
//         }).then(response => response.json())
//         .then(jsonResponse =>{
//             if(!jsonResponse.tracks){
//                 return 'No matches found'
//             }
//             return jsonResponse.tracks.items.map(track=>{
//                 return ({
//                     id: track.id,
//                     name: track.name,
//                     artist: track.artists[0].name,
//                     album: track.album.name,
//                     uri: track.uri

//                 })
//             });
//         })
//     },
//     async savePlaylist(name, trackUris){
//         const accessToken = Spotify.getAccessToken();
//         const headers = {Authorization: `Bearer ${accessToken}`};
//         if(!name || !trackUris){
//             return
//         }
//  Spotify.userProfile().then(response => {
//             if(response.ok){
//                 console.log(response)
//             }
//         });
//     //     const playlistName = {
//     //         name: name
//     //     }
//     //     const userId = userDet.id;
//     //     console.log(userId);
//     //     try{
//     //         const playListIdRequest = await axios.post(`https://api.spotify.com/v1/users/${userId.id}/playlists`,
//     //         playlistName,
//     //     {headers: headers}                    
                
            
//     //     )
//     //     const playListId = playListIdRequest.data.id;
//     //     console.log(playListId);
        // return axios.post(`https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`,
        //      {uris: trackUris},
        //      {headers: headers},
        //      {onUploadProgress: function (progressEvent) {
        //         // Do whatever you want with the native progress event
        //         console.log(progressEvent)
        //       }})
        



//     //     }
//     //     catch(e){
//     //         console.log(e)
//     //     }
//      }

// }

// export default Spotify;



const clientId ='42b83fe4e16f4244bd6e9947035f8a95';
const redirectURI ='http://localhost:3000/';
let accessToken;

 const Spotify ={
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        }else{
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location  = accessUrl;
        }
    },
    userProfile(){
        const accessToken = Spotify.getAccessToken();
        return fetch('https://api.spotify.com/v1/me',{ headers: {
            Authorization : `Bearer ${accessToken}`
        }}).then(resp => resp.json()).then(jsonResponse=>jsonResponse)
        // return userProfileReq
        
         
        
                     
    }
        ,
    search(term){
        console.log('1');
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
        {
            headers: {
                Authorization : `Bearer ${accessToken}`
            }
        }).then(response => response.json())
        .then(jsonResponse =>{
            if(!jsonResponse.tracks){
                return 'No matches found'
            }
            return jsonResponse.tracks.items.map(track=>{
                return ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri

                })
            });
        })
    },
    async savePlaylist(name, trackUris){
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer ${accessToken}`};
        if(!name || !trackUris){
            return
        }

        const userId = await fetch('https://api.spotify.com/v1/me',{headers: headers})
        .then(response=> response.json())
        .then(jsonResponse=> jsonResponse.id);
      
        const playListId = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: name})
        }).then(response=> response.json())
        .then(jsonResponse=> jsonResponse.id);
        console.log(playListId);
        return axios.post(`https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`,
             {uris: trackUris},
             {headers: headers},
             {onUploadProgress: function (progressEvent) {
                // Do whatever you want with the native progress event
                console.log(progressEvent)
              }})

    }
}

export default Spotify;