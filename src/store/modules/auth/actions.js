import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth'

import { auth } from '../../../plugins/firebase'

export default {
  async login(context) {
    const provider = new GoogleAuthProvider()
    // return signInWithRedirect(auth, provider);
    try {
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      await context.dispatch('addUserToDB', user)
      context.commit('setUser', user.uid)
      await context.dispatch('loadRecords')
    } catch (err) {
      throw new Error(err.message || 'Failed to authenticate')
    }
  },
  async setUser(context, userId) {
    context.commit('setUser', userId)
  },
  async logout(context) {
    try {
      await signOut(auth)
      context.commit('logout')
    } catch (err) {
      const error = new Error(err.message)
      throw error
    }
  }
}
