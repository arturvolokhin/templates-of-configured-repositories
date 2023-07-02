import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { AppState } from '@/store/interfaces';

import type { AuthStateType } from './interfaces';

const initialState: AuthStateType = {
  token: '000',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
  },
});

export const { setToken } = authSlice.actions;
export const selectAuthState = (state: AppState) => state.auth;

export default authSlice.reducer;
