import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/js/all.js';
import './assets/scss/custom.scss'
import './App.css';
import Layout from './layout';
import { get, baseURL, post } from './services';
import { gapi } from 'gapi-script';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const styles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',  
  };

  useEffect(() => {
    loadGApi();
  }, [isLoggedIn, user]);

  const loadGApi = () => {
    gapi.load('client:auth2', () => {
      let auth2 = gapi.auth2.getAuthInstance();
      auth2.then(() => {
        let isSignedIn = auth2.isSignedIn.get();
        setIsLoggedIn(isSignedIn);
        
        if(isSignedIn){
          let currentUser = auth2.currentUser.get();
          console.log(currentUser.dt);
        }
      });
    });
  }

  const onSignIn = (googleUser) => {
    let profile = googleUser.getBasicProfile();
    console.log(profile);

    let newUser = post('user/google-response', {
    "objectIdentifier": profile.LS,
    "name": profile.uU,
    "lastname": profile.qS,
    "email": profile.Nt}).then(() => {
      setUser(newUser)
      console.log(user)
    });
  }

  const handleSignIn = async () => {
    setIsLoggedIn(true)
  }

  return (
    <div style={styles}>
      {
        !isLoggedIn && user === null ?
        <div className="g-signin2" data-onsuccess="onSignIn" onClick={() => handleSignIn()}/> 
        : <Layout 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
          user={user} />
      }
    </div>);
};

export default App;
