import {Map} from 'immutable';

const auth = (state=Map(), action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      if (action.user) {
        return state.set('uid', action.user.uid);
      } else {
        return state.set('uid', null);
      }
    default:
      return state.set('uid', null);
  }
};

export default auth;
