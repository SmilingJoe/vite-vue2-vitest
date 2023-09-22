import Vue from 'vue';
import App from './App.vue';

import runApp from './app.run';

Vue.config.productionTip = false;

runApp();

export default new Vue({
    render: h => h(App)
}).$mount('#app');
