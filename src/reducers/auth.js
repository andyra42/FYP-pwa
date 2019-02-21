import {fromJS} from 'immutable';

const INITIAL_STATE = fromJS({
  uid: null,
  userProfile: null
});

const auth = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      if (action.user) {
        return state.set('uid', action.user.uid);
      } else {
        return state.set('uid', null);
      }
    case 'GET_USER_PROFILE':
      return state.set('userProfile', action.userProfile);
    default:
      return state;
  }
};

export default auth;
