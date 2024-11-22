// import './assets/main.css'

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css'; // Importar íconos

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Crear Vuetify
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Especificar Material Design Icons como el set predeterminado
  },
});

// Crear la aplicación y usar Vuetify, Pinia y el router
createApp(App)
  .use(vuetify) // Usa Vuetify
  .use(createPinia()) // Usa Pinia
  .use(router) // Usa Vue Router
  .mount('#app');
