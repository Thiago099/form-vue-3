import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import './main.css'

const app = createApp(App)
import template from './template/global'
app.mixin(template)

import http from './http.js'
app.mixin(http);

import mitt from 'mitt';
app.config.globalProperties.emitter = mitt();


app.mount('#app')
