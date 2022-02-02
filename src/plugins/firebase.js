import { initializeApp } from 'firebase/app'

import { getAuth, onAuthStateChanged } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
}

initializeApp(firebaseConfig)

export const auth = getAuth()

export const getUserState = () =>
  new Promise((resolve, reject) => {
    onAuthStateChanged(auth, resolve, reject)
  })

// export { getUserState }

// export const useAuthState = () => {
//   const user = ref(null);
//   const error = ref(null);

//   const auth = getAuth();
//   let unsubscribe;
//   onMounted(() => {
//     unsubscribe = onAuthStateChanged(
//       auth,
//       u => (user.value = u),
//       e => (error.value = e)
//     );
//   });
//   onUnmounted(() => unsubscribe());

//   const isAuthenticated = computed(() => user.value != null);
//   return { user, error, isAuthenticated };
// };
