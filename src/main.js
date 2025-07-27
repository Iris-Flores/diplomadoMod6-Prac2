import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createBootstrap, BButton, BModal } from 'bootstrap-vue-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap'

import axios from 'axios';
import VueAxios from 'vue-axios';


const app = createApp(App);
app.use(createBootstrap({ components: true, directives: true }));
app.component('BButton', BButton);
app.component('BModal', BModal);

app.use(VueAxios, axios);
app.use(router);

app.mount('#app');
