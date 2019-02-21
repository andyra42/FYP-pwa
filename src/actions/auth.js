import firebase from 'firebase';

export const updateUser = user => ({
  type: 'UPDATE_USER',
  user
});

export const getUserProfile = uid => {
  return (dispatch) => {
    if (uid !== null) {
      var docRef = firebase.firestore().collection('users').doc(uid);

      return docRef.get().then((doc) => {
        dispatch({
          type: 'GET_USER_PROFILE',
          userProfile: doc.data()
        });
      });
    } else {
      dispatch({
        type: 'GET_USER_PROFILE',
        userProfile: null
      });
    }
  };
}
