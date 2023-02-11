import React from 'react';
import { Container } from '@material-ui/core';
import { Auth, Navbar, Home, PostDetails } from './components';
import { Routes, Route, Navigate  } from 'react-router';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'))


  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`} >
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/posts' replace />} />
          <Route path='/posts' element={<Home />} />
          <Route path='/posts/search' element={<Home />} />
          <Route path='/posts/:id' element={<PostDetails />} />
          <Route path='/auth' element={!user?.length ? <Auth />: <Navigate to='/posts' replace />} />
        </Routes>
      </Container>
  </GoogleOAuthProvider>
  );
};

export default App;
