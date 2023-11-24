import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo, submitUserInfo } from '../actions/user';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    authUser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state, action) => {})
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.authUser = payload.user;
      })
      .addCase(getUserInfo.rejected, (state) => {})
      .addCase(submitUserInfo.pending, (state, action) => {})
      .addCase(submitUserInfo.fulfilled, (state, { payload }) => {
        state.authUser = payload.newAuth;
      })
      .addCase(submitUserInfo.rejected, (state) => {});
  },
});

export default userSlice.reducer;
