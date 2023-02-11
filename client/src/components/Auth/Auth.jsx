import React, { useState } from 'react';
import { Avatar, Button, Container, Paper, Typography, Grid } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import Input from './input';
import { useNavigate } from 'react-router';
import { login, signIn, signUp } from '../../features/postSlice';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(false);
  const { error } = useSelector((state) => ({...state.post}));
  const user = JSON.parse(localStorage.getItem('profile'))

  const classes = useStyles();
  var navigate = useNavigate();
  const dispatch = useDispatch()

  const switchMode = () => {
    setIsSignup((pre) => !pre);
    setShowPassword(false);
  };
  const handleShowPassword = () => setShowPassword((pre) => !pre);
  const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
  };


  const handleSubmit =  (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUp(formData))
        .then(() => {
           setIsSignup(true)
        })
    } else {
      dispatch(signIn(formData)) 
        .then(() => {
          if(!user){
            setErrorMessage(true);
            setTimeout(() => setErrorMessage(false), 3000);
          }else{
            navigate('/', {replace: true})
          }
           
        }) 
      };
    }
  
  const createOrGetUser = (res) => {
    const result = jwtDecode(res.credential)

    console.log('Decoded Response',result)
    const token = res.credential;
    dispatch(login({result, token}))
    navigate('/');
  }
  
  

  return (
    <Container component='main' maxWidth='xs'>
     {errorMessage && 
     <Paper variant='outlined' elavation={2} className={classes.error} >
      <Typography fontSize='small' variant='h6'>{error}</Typography>
     </Paper>}
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avater}>
          <LockOutlined />
        </Avatar>
        <Typography variant='h5'>{ isSignup ? 'Sign Up':'Sign In'}</Typography>
        <form className={classes.form}  onSubmit={handleSubmit}>
          <Grid container item spacing={2}>
            {isSignup && (
              <>
                  <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                  <Input name='lastName' label='Last Name' handleChange={handleChange} autoFocus half/>
              </>
            )}
            <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}
          </Grid>
          <Button type='submit' variant='contained' color='primary' className={classes.submit} fullWidth>
            {isSignup ? 'Sign Up': 'Sign In'}
          </Button>
          <GoogleLogin 
            onSuccess={(res) => createOrGetUser(res)}
            onError={ (e) => console.log(e)} 
           />
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode} >
                {isSignup ? 'Already have an account? Sign In':"Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth