import React, { useEffect } from 'react';
import useStyles from './styles';
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../features/postSlice';

const Paginate = ({page}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { _id, done, numberOfPages} = useSelector((state) => ({...state.post}));

  useEffect(() => {
    if(page) dispatch(getPosts(page));


  }, [page, _id, done, dispatch])
  

  return (
    <Pagination 
        classes={{ul: classes.ul}}
        count={numberOfPages}
        page={ Number(page) || 1}
        variant='outlined'
        color='primary'
        renderItem={(item) => (
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
        )}
    />
  )
}

export default Paginate