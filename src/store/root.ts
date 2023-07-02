import { combineReducers } from '@reduxjs/toolkit';

import auth from './slices/auth/auth';

const rootReducer = combineReducers({
  auth,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
