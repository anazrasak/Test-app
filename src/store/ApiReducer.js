import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk('api/fetchData', async () => {
  // const queryString = new URLSearchParams(params).toString();
  // const response = await fetch(`https://jsonplaceholder.typicode.com/posts?${queryString}`);
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  return response.json();
});

export const fetchPosts = createAsyncThunk('app/fetchPosts', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  return res.json();
});

export const postData = createAsyncThunk('api/postData', async body => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return response.json();
});

export const postFormData = createAsyncThunk(
  'api/postFormData',
  async formData => {
    const response = await fetch('https://your-api.com/upload', {
      method: 'POST',
      body: formData,
    });

    return response.json();
  },
);

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    data: [],
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log('action.payload', action.payload);
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchPosts.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        console.log('action.payload2', action.payload);
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(postData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Post Success:', action.payload);
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(postFormData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postFormData.fulfilled, (state, action) => {
        state.loading = false;
        console.log('FormData Post Success:', action.payload);
      })
      .addCase(postFormData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
