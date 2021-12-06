import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth';

export default {
  async login(context) {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    // return signInWithRedirect(auth, provider);
    try {
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const user = result.user;
        context.commit('setUser', {
          userId: user.uid
        });
      }
    } catch (err) {
      const error = new Error(err.message || 'Failed to authenticate');
      throw error;
    }
  },
  setUser(context, userId) {
    context.commit('setUser', {
      userId: userId
    });
  },
  async logout(context) {
    try {
      await signOut(getAuth());
      context.commit('logout');
    } catch (err) {
      const error = new Error(err.message);
      throw error;
    }
  }
};
