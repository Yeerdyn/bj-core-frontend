import { action } from 'typesafe-actions';

// Actions
const SAVE = 'bj/userProfile/SAVE';
const REMOVE = 'bj/userProfile/REMOVE';

// Action Creators
export function saveUserProfile(data: { isAuthorized: boolean } | null) {
  return action(SAVE, data);
}

export function removeUserProfile() {
  return action(REMOVE);
}

// Types
type Action =
  | ReturnType<typeof saveUserProfile>
  | ReturnType<typeof removeUserProfile>;

type State = null | Readonly<object>;

// Reducer
export default function reducer(state: State = null, action: Action): State {
  switch (action.type) {
    case SAVE:
      return Object.assign({}, action.payload);
    case REMOVE:
      return null;
    default:
      return state;
  }
}
