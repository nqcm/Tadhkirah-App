import { createApp } from 'vue'

import './styles/tailwind.css'

import store from './store/index.js'
import router from './router.js'
import App from './App.vue'
import BaseCard from './components/UI/BaseCard.vue'
import BaseButton from './components/UI/BaseButton.vue'
import BaseBadge from './components/UI/BaseBadge.vue'
import BaseModal from './components/UI/BaseModal.vue'
import BaseSpinner from './components/UI/BaseSpinner.vue'
import BaseSaving from './components/UI/BaseSaving.vue'

import '@/plugins/firebase'

const app = createApp(App)

app.component('base-card', BaseCard)
app.component('base-button', BaseButton)
app.component('base-badge', BaseBadge)
app.component('base-modal', BaseModal)
app.component('base-spinner', BaseSpinner)
app.component('base-saving', BaseSaving)

app.use(store)
app.use(router)

app.mount('#app')
