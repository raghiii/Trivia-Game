import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const anonymousSignIn = () => {
  auth()
    .signInAnonymously()
    .then(() => {
      console.log('User signed in anonymously');
    })
    .catch((error) => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }
      console.error(error);
    });
};

export const loginStatus = (value) => {
  auth().onAuthStateChanged(function (user) {
    if (user) {
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      firestore()
        .collection('Users')
        .doc(uid)
        .set({
          name: value,
          isAnonymous: isAnonymous,
        })
        .then(() => {
          console.log('User added!');
        });
    }
  });
};

export const updateUserInfo = (total) => {
  auth().onAuthStateChanged(function (user) {
    if (user) {
      var uid = user.uid;
      firestore()
        .collection('Users')
        .doc(uid)
        .update({
          score: total,
        })
        .then(() => {
          console.log('User updated!');
        });
    }
  });
};

export const logout = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};
