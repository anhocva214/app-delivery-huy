import { createSlice } from '@reduxjs/toolkit';
import { fetchUserById, fetchUserList, signIn, signUp } from '../actions/auth';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userList: [],
    selectedUser: null,
    signUp: {
      loading: 'pending',
      user: null,
      error: null,
    },
    signIn: {
      loading: 'pending',
      user: null,
      error: null,
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.userList = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.signUp.loading = 'pending';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signUp.loading = 'fulfilled';
        state.signUp.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUp.loading = 'rejected';
        state.signUp.error = action.error;
      })
      .addCase(signIn.pending, (state) => {
        state.signIn.loading = 'pending';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.signIn.loading = 'fulfilled';
        state.signIn.user = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signIn.loading = 'rejected';
        state.signIn.error = action.error;
      });
  },
});

export default authSlice.reducer;