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
      const bypassCache = true;
      if (result) {
        const user = result.user;
        await context.dispatch('addUserToDB', user);
        context.commit('setUser', user.uid);
        await context.dispatch('loadRecords', bypassCache);
      }
    } catch (err) {
      const error = new Error(err.message || 'Failed to authenticate');
      throw error;
    }
  },
  setUser(context, userId) {
    context.commit('setUser', userId);
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
