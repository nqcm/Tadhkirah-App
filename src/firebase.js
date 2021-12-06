// import { initializeApp } from 'firebase/app';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { ref, computed, onMounted, onUnmounted } from 'vue';

// const firebaseConfig = {
//   apiKey: 'AIzaSyCEscme4XbTJSJj2-hTivPCeDJW93OxsRo',
//   authDomain: 'tadhkirah-13575.firebaseapp.com',
//   databaseURL: 'https://tadhkirah-13575-default-rtdb.firebaseio.com',
//   projectId: 'tadhkirah-13575',
//   storageBucket: 'tadhkirah-13575.appspot.com',
//   messagingSenderId: '238192085748',
//   appId: '1:238192085748:web:d4d5ee9f8156a5be4beca1',
//   measurementId: 'G-G98EXYPVF2'
// };

// export const firebaseApp = initializeApp(firebaseConfig);

export const getUserState = () =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(getAuth(), resolve, reject)
  );

export const useAuthState = () => {
  const user = ref(null);
  const error = ref(null);

  const auth = getAuth();
  let unsubscribe;
  onMounted(() => {
    unsubscribe = onAuthStateChanged(
      auth,
      u => (user.value = u),
      e => (error.value = e)
    );
  });
  onUnmounted(() => unsubscribe());

  const isAuthenticated = computed(() => user.value != null);
  return { user, error, isAuthenticated };
};
