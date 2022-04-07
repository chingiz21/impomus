// NOTE! I didn't use this hook, instead watch spotifyRequests.js

import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  if (localStorage.getItem('access_token') === null || undefined) {
    // useEffect(() => {
    //     axios
    //       .post("http://localhost:5000/token", null , {
    //         params: {
    //           code
    //         }
    //       })
    //       .then((response) => {
    //         //   If success then cut the code string from the URL and execute the other thing
    //         console.log(response);
    //         window.history.pushState({}, null, "/playlists");
    //         // console.log(response.data);
    //         localStorage.setItem("access_token", response.data.accessToken);
    //         localStorage.setItem("refresh_token", response.data.refreshToken);
    //         localStorage.setItem("expires_in", response.data.expiresIn);
    //         setAccessToken(response.data.accessToken);
    //         setRefreshToken(response.data.refreshToken);
    //         setExpiresIn(response.data.expiresIn);
    //       })
    //   }, [code]);

    axios
      .post("http://localhost:5000/spotify/token", null, {
        params: {
          code
        }
      })
      .then((response) => {
        window.history.pushState({}, null, "/playlists");
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem("refresh_token", response.data.refreshToken);
        localStorage.setItem("expires_in", response.data.expiresIn);
      })

  }
  // window.history.pushState({}, null, "/playlists");
  return localStorage.getItem('access_token');

  // useEffect(() => {

  //     if (!refreshToken || !expiresIn) return;

  //     let interval = setInterval(() => {
  //         axios.post('http://localhost:5000/refresh', { refreshToken })
  //         .then((response) => {
  //             setAccessToken(response.data.accessToken);
  //             setExpiresIn(response.data.expiresIn);
  //         })
  //         .catch(() => {
  //             window.location = '/playlists';
  //         })
  //     }, (expiresIn - 60) * 1000);

  //     return () => clearInterval(interval);

  // }, [refreshToken, expiresIn]);

  // return accessToken;
}