import type { Action, ThunkAction } from '@reduxjs/toolkit';

import type { AppStore } from '.';
import type { RootState } from './root';

export type AppState = RootState;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
