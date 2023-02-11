import React from 'react';
import { Card, CardActions, CardMedia, Button, Typography, CardContent } from '@material-ui/core';
import { ThumbUpAltRounded, ThumbUpAltOutlined, DeleteRounded, MoreHorizRounded } from '@material-ui/icons';
import useStyles from './styles';
import moment from 'moment';
import { deletePost, likePost, userId } from '../../../features/postSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

const Post = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
 
  const Id = user?.result?.sub || user?.result?._id;

const Likes = () => {
  if(post?.likes?.length > 0) {
    return post?.likes?.find((like) => like === Id) ?
    (
      <><ThumbUpAltRounded fontSize='small' />&nbsp;{post?.likes?.length > 2 ? `You and ${post?.likes?.length -1} others`: `${post?.likes?.length} like${post?.likes?.length > 1 ? 's': ''}`}</>
    ):(
      <><ThumbUpAltOutlined fontSize='small' />&nbsp;{post?.likes?.length} {post?.likes?.length === 1 ? `Like`: 'post?.likes?'} </>
    )
  }
    return <><ThumbUpAltOutlined fontSize='small'/>&nbsp;Like</>
};

  return (
    <Card className={classes.card} raised elevation={6}>
      <div onClick={() => navigate(`/posts/${post._id}`)} style={{cursor: 'pointer'}}>
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post?.title} />
        <div className={classes.overlay}>
          <Typography variant='h6'>{post?.name}</Typography>
          <Typography variant='body2'>{moment(post?.createdAt).fromNow()}</Typography>
        </div>
        {((user?.result?.sub === post?.creator )|| (user?.result?._id === post?.creator)) && (
          <div className={classes.overlay2} >
            <Button style={{color: 'white'}} size="small" onClick={(e) => {e.stopPropagation(); dispatch(userId(post?._id))}}>
              <MoreHorizRounded fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant='body2' color="textSecondary" component='h2'>
            {post?.tags?.map((tag) => `#${tag}` )}
          </Typography>
        </div>
        <Typography variant='h5' component='h2' className={classes.title} gutterBottom>
          {post?.title}
        </Typography>
          </div>
      <CardContent> 
        <Typography variant='body2' component='p'>
          {post?.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost( post?._id))}>
          <Likes />
        </Button>
        {((user?.result?.sub === post?.creator )|| (user?.result?._id === post?.creator)) && (
          <Button size='small' color='primary' onClick={() => dispatch(deletePost(post?._id))}>
            <DeleteRounded fontSize='small' />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post