import React, { useState } from 'react';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { Typography, TextField, Button } from '@material-ui/core';
import { commentPost } from '../../features/postSlice';

const Comments = ({ post }) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [comments, setComments] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
   

    const handleClick = async () => {
        const finalComment = `${user.result.name}: ${comments}`
        await dispatch(commentPost({value: finalComment, id: post._id}))
        setComments('');           
    };

  return (
    <div>
        <div className={classes.commentsOuterContainer}>
            <div className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant='h6'>Comments</Typography>
                {post?.comments?.map((comment, i) => (
                    <Typography key={i}  gutterBottom variant='subtitle1'>
                      <strong> {comment.split(':')[0]} </strong>
                      {comment.split(':')[1]}
                    </Typography>
                ))}
            </div>
            {user?.result?.name && (
                <div style={{width: '100%'}}>
                    <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                    <TextField minRows={4} variant='outlined' label='Comment' multiline value={comments} onChange={(e) => setComments(e.target.value)}/>
                    <Button color='primary' style={{marginTop: '10px'}} fullWidth disabled={!comments} variant='contained' onClick={handleClick}>Comment</Button>
                </div>
            )}
        </div>
    </div>
  )
}

export default Comments