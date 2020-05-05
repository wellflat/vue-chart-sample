import Vue from 'vue';
import App from './app.vue';

Vue.config.productionTip = false;
document.title = "t-SNE projection visualizer";
new Vue({
  render: h => h(App),
}).$mount('#app');
