import React, { useState, useEffect } from 'react'
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import memories from '../../assets/experience.png';
import circle from '../../assets/circle.png';
import useStyles from './styles';
import decode from 'jwt-decode';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/postSlice';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Logout = () => {
        googleLogout();
        dispatch(logout())
        setUser(null)
        navigate('/');
    };

    useEffect(() => {
        const token = user?.token;
        if(token){
            const decodedData = decode(token);
        
            if(decodedData.exp * 1000 < new Date().getTime()) Logout();
          }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

  

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to='/' className={classes.brandContainer}>
            <img src={memories} alt="icon" height="60" />
            <img className={classes.image} src={circle} alt="icon" height="30" />
        </Link>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.userName || user?.result?.name} src={user.image || user?.result?.picture}>{user?.userName?.charAt(0) || user?.result?.name?.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant='h6'>{user.userName || user?.result?.name}</Typography>
                    <Button variant="contained" color="secondary" className={classes.logout} onClick={Logout}>Logout</Button>
                </div>
            ):(
                <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
            )}
        </Toolbar>
      </AppBar> 
  )
}

export default Navbar