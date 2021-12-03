import { createApp } from 'vue';
import { initializeApp } from 'firebase/app';

import store from './store/index.js';
import router from './router.js';
import App from './App.vue';
import BaseCard from './components/UI/BaseCard.vue';
import BaseButton from './components/UI/BaseButton.vue';
import BaseBadge from './components/UI/BaseBadge.vue';
import BaseModal from './components/UI/BaseModal.vue';
import BaseSpinner from './components/UI/BaseSpinner.vue';

const firebaseConfig = {
  apiKey: 'AIzaSyCEscme4XbTJSJj2-hTivPCeDJW93OxsRo',
  authDomain: 'tadhkirah-13575.firebaseapp.com',
  databaseURL: 'https://tadhkirah-13575-default-rtdb.firebaseio.com',
  projectId: 'tadhkirah-13575',
  storageBucket: 'tadhkirah-13575.appspot.com',
  messagingSenderId: '238192085748',
  appId: '1:238192085748:web:d4d5ee9f8156a5be4beca1',
  measurementId: 'G-G98EXYPVF2'
};

initializeApp(firebaseConfig);

const app = createApp(App);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-modal', BaseModal);
app.component('base-spinner', BaseSpinner);

app.use(store);
app.use(router);

app.mount('#app');
