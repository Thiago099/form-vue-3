import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import './global/main.css'
import './costum/css/followair-icones.css'

const app = createApp(App)
import template from './global/global'
app.mixin(template)

import http from './global/http.js'
app.mixin(http);

import mitt from 'mitt';
app.config.globalProperties.emitter = mitt();

import router from './global/router'
app.use(router)


app.mount('#app')
