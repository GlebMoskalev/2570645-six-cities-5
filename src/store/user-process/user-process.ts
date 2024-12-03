import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state.ts';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  email: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
    saveEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setAuthorizationStatus, saveEmail } = userProcess.actions;
