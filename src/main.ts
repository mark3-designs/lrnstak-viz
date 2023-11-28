import './assets/main.css'

import { createApp } from 'vue'
import router from './routes'
import 'vuetify/styles'
import createVuetify from './plugins/vuetify'
import { createPinia } from "pinia";
import VueFeather from 'vue-feather';
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia();
const vuetify = createVuetify

app.component(VueFeather.name, VueFeather);

app
  .use(router)
  .use(vuetify)
  .use(pinia)
  .mount('#app')
