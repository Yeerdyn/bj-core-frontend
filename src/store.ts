import { createStore, combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { ActionTypes } from 'src/utilities/getActionsFromReducerMap';

import userProfile from './ducks/userProfile';

const reducers = {
  userProfile,
};

export type RootState = Readonly<StateType<typeof reducers>>;
export type RootAction = ActionTypes<typeof reducers>;

const store = createStore(
  combineReducers<RootState, RootAction>(reducers),
  ((window: any) =>
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__())(window)
);

export default store;
