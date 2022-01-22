import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore/lite'

import { auth } from '../../../plugins/firebase'

export default {
  async addUserToDB(_, user) {
    const db = getFirestore()
    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return
    } else {
      await setDoc(docRef, {
        id: user.uid,
        name: user.displayName,
        email: user.email
      })
    }
  },
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
