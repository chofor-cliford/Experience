import React from "react";
import Post from "./Post/Post";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyles from "./styles";

const Posts = () => {
  const { posts, loading } = useSelector((state) => ({ ...state.post }));
  const classes = useStyles();
  console.log("Post: ", posts);
  if (!posts?.length && !loading) return "No Post avialable!";

  return loading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map(
        (post) =>
          ( 
            <Grid key={post?._id} item xs={12} sm={6} md={6} lg={3}>
              <Post post={post} />
            </Grid>
          )
      )}
    </Grid>
  );
};

export default Posts;
