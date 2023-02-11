import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost, userId } from '../../features/postSlice';
import { useNavigate } from 'react-router';

const Form = () => {

  const classes = useStyles();
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: ''});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const { posts, _id } = useSelector((state) => ({...state.post}))
  const data = { ...postData, name : user?.result?.name}
  const postItems = _id ?  posts?.find((item) => item._id === _id) : null; 

  useEffect(() => {
    if(postItems) 
      setPostData(postItems);
  }, [postItems]);
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (_id === 0) {
      dispatch(createPost({post:data}));
    } else {
      dispatch(updatePost({id:_id, post:data}));
      
    }
    clear();
  };

  const clear = () => {
    dispatch(userId(0));
    setPostData({ title: '', message: '', tags: '', selectedFile: ''})
  };

  if(!user?.result?.name){
      return(
      <Paper elevation={3}>
        <Typography variant='h6' className={classes.paper1}>
          Please Sign In to create your own experience and like other's experience.
        </Typography>
      </Paper>
    )}

  return (
    <Paper className={classes.paper} elevation={6}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{postItems?.title ? `Editing ${postItems.title}` : 'Creating a Memory'}</Typography>
        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value }) } />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}/>
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') }) } />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 }) } /></div>
        <Button type='submit' className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;