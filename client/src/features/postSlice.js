import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const getPost = createAsyncThunk(
    "getPost",
     async (id) => {
        try {
           const { data } = await api.fetchPost(id);
              
           return data;
        } catch (error) {
            console.log(error)
        }
});

export const getPosts = createAsyncThunk(
    "getPosts",
     async (page) => {
        try {
           const { data } = await api.fetchPosts(page);    

           return data;
        } catch (error) {
            console.log(error)
        }
});
export const createPost = createAsyncThunk(
    "createPost",
     async ({post}) => {
        try {
           const { data } = await api.createPost(post);
           
           return data;
        } catch (error) {
            console.log(error)
        }
});
export const updatePost = createAsyncThunk(
    "updatePost",
     async ({id, post}) => {
        try {
           const { data } = await api.updatePost( id, post);
           
           return data;
        } catch (error) {
            console.log(error)
        }
});
export const deletePost = createAsyncThunk(
    "deletePost",
     async (id) => {
        try {
         await api.deletePost(id);
            
        } catch (error) {
            console.log(error)
        }
});

export const likePost = createAsyncThunk(
    "likePost",
     async (id) => {
        try {
           const { data } = await api.likePost(id);
            
           return data;
        } catch (error) {
            console.log(error)
        }
});

export const signIn = createAsyncThunk(
    "signIn",
    async (formData) => {
            try {
                const { data } = await api.signIn(formData);

                return data;
            } catch (error) {
                console.log(error)
            }
});
export const signUp = createAsyncThunk(
    "signUp",
    async (formData) => {
            try { 
                const { data } = await api.signUp(formData);     

                 return data;
            } catch (error) {
                console.log(error)
            }
    });

export const getPostBySearch = createAsyncThunk(
    "getPostBySearch",
    async (searchQuery) => {
        console.log('Search Query',searchQuery)
        try { 
                const { data: {data} } = await api.fetchPostsBySearch(searchQuery);     
                
                return data;
            } catch (error) {
                console.log(error)
             }
     });
export const commentPost = createAsyncThunk(
    "commentPost",
    async ({value, id}) => {
        console.log('Comments', value)
        try { 
                const {data : {comments}} = await api.comment(value, id)     
                   
                return comments;
            } catch (error) {
                console.log(error)
            }
    });

const initialState ={
    posts: [],
    post: [],
    _id: 0,
    loading: false,
    error: '',
    done: 0,
    currentPage: 0,
    numberPages: 0
};

const postslice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        userId: (state, {payload}) => {
            state._id = payload;
        },
        login : (state, { payload }) => {
            localStorage.setItem('profile', JSON.stringify(payload))
        },
        logout : (state, actions) => {
            localStorage.clear()
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPosts.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.posts = payload.data;
            state.currentPage = payload.currentPage;
            state.numberPages = payload.numberPages

        });
        builder.addCase(getPosts.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload.error;
        });
        builder.addCase(createPost.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createPost.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.posts = [payload];
            state.done += 1;
        });
        builder.addCase(createPost.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload.error;

        });
        builder.addCase(updatePost.fulfilled, (state, { payload }) => {
            state.posts = state?.posts?.map((item) => item._id === payload?._id ? payload : item);
            state.done +=1;
        });
        builder.addCase(updatePost.rejected, (state, {payload}) => {
            state.error = payload.error;
        });
        builder.addCase(deletePost.fulfilled, (state, { payload }) => {
            state.posts = state?.posts?.filter((item) => item._id !== payload);
            state.done +=1;
        });
        builder.addCase(deletePost.rejected, (state, {payload}) => {
            state.error = payload.error;

        });
        builder.addCase(likePost.fulfilled, (state, { payload }) => {
            state.posts = state.posts.map((item) => item._id === payload?._id ? payload : item);
            
        });
        builder.addCase(likePost.rejected, (state, {payload}) => {
            state.error = payload.error;

        });
        builder.addCase(signIn.fulfilled, (state, {payload}) => {
            console.log(payload)
            payload?.result === undefined ? 
             state.error = 'password or email incorrect, please check an try, again.':
             localStorage.setItem('profile', JSON.stringify(payload));            
        });
        builder.addCase(signIn.rejected, (state, {payload}) => {
            state.error = payload?.error;

        });
        builder.addCase(signUp.fulfilled, (state, {payload}) => {
            localStorage.setItem('profile', JSON.stringify(payload))

        });
        builder.addCase(signUp.rejected, (state, {payload}) => {
            state.error = payload?.error;

        });
        builder.addCase(getPostBySearch.pending, (state) => {
            state.loading = true;          
        });
        builder.addCase(getPostBySearch.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.posts = payload;
            console.log('Success', payload)

        });
        builder.addCase(getPostBySearch.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload?.error;

        });
        builder.addCase(getPost.pending, (state) => {
            state.loading = true; 

        });
        builder.addCase(getPost.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.post = payload;

        });
        builder.addCase(getPost.rejected, (state, {payload}) => {
            state.loading = false;
            state.error = payload?.error;

        });
        builder.addCase(commentPost.fulfilled, (state, {payload}) => {
            state.posts = state.posts.map((item) => {
                if(item._id === payload._id) return payload;
                
                return payload;
        });

        });
        builder.addCase(commentPost.rejected, (state, {payload}) => {
            state.error = payload?.error;

        });
    }

});

export const { userId, logout, login  } = postslice.actions;
export default postslice.reducer;