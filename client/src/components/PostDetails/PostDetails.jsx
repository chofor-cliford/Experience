import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import useStyles from './styles';
import { getPostBySearch, getPost } from '../../features/postSlice';
import { Comments } from '..';

const PostDetails = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const { post, posts, loading } = useSelector((state) => ({...state.post}));
  
  useEffect(() => {
    dispatch(getPost(id));
   
  }, [id, dispatch]);

  useEffect(() => {
    if(post) {
    dispatch(getPostBySearch({search: 'none', tags: post?.tags?.join(',')}))
  }
  }, [post, dispatch]);
  
  const recomendedPost = posts?.filter(({_id}) => _id !== id);

  if(!posts) return null;

  if(loading) return 
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size='7rem' />
    </Paper>
  return (
    <Paper style={{padding: '20px', borderRadius: '15px',}} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant='h3' component='h2'>{post?.title}</Typography>
          <Typography variant='h6' gutterBottom color='textSecondary' component='h2'>{post?.tags?.map((tag) => `#${tag}` )}</Typography>
          <Typography variant='body1' gutterBottom component='p'>{post?.message}</Typography>
          <Typography variant='h6'>Created by: {post?.name}</Typography>
          <Typography variant='body1'>{moment(post?.createdAt).fromNow()}</Typography>
          <Divider style={{margin: '20px 0'}} />
          <Typography variant='body1'><strong>Headline Chat - coming soon!</strong></Typography>
          <Divider style={{margin: '20px 0'}} />
          <Typography variant='body1'><Comments post={post}/></Typography>
          <Divider style={{margin: '20px 0'}} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={posts.title} />
        </div>
      </div>
      {recomendedPost?.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant='h5'> You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPost}>
            {recomendedPost.map(({title, message, name, likes, selectedFile, _id}) => (
              <Link style={{margin: '20px', color: '#000', textDecoration: 'none', cursor: 'pointer'}} to={`/posts/${_id}`} key={message + _id}>
                <Typography gutterBottom variant='h6'>{title}</Typography>
                <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                <Typography gutterBottom variant='subtitle2'>{message}</Typography>
                <Typography gutterBottom variant='subtitle1'>Likes: {likes?.length}</Typography>
                <img src={selectedFile} alt={title} width='200px' />
              </Link>
            ))}
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PostDetails