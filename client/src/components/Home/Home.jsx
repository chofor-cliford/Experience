import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import { Post, Form } from "..";
import { useDispatch } from "react-redux";
import { getPostBySearch } from "../../features/postSlice";
import { Pagination } from "..";
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles";
import { useLocation, useNavigate } from "react-router";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const handlePress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/");
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid
        className={classes.gridContainer}
        container
        justifyContent="space-between"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12} sm={6} md={9}>
          <Post />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppBar
            className={classes.appBarSearch}
            position="static"
            color="inherit"
          >
            <TextField
              name="search"
              variant="outlined"
              label="Search Experience"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handlePress}
            />
            <ChipInput
              styles={{ margin: "8px 0" }}
              value={tags}
              className={classes.searchButton}
              onAdd={handleAdd}
              onDelete={handleDelete}
              label="Search Tags"
              variant="outlined"
            />
            <Button
              onClick={searchPost}
              variant="contained"
              className={classes.searchButton}
              color="primary"
            >
              Search
            </Button>
          </AppBar>
          <Form />
          {!searchQuery && !tags.length && (
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
