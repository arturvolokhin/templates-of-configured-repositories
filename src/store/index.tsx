import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import type { Action, AnyAction, Reducer, ThunkAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import type { RootState } from './root';
import rootReducer from './root';

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = RootState;
export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

const makeStore = wrapMakeStore(() => {
  const reducer: Reducer<AppState, AnyAction> = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state,
        ...action.payload,
      };
      return nextState;
    }

    return rootReducer(state, action);
  };

  const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: ['counter'],
        })
      ),
  });

  return store;
});

export const wrapper = createWrapper<AppStore>(makeStore);
