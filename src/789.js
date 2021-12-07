import  Vue from 'vue'
import  App from './App.vue'


vue.config.productionTip = false

new vue({
    render: h => h(App),
}).$mount('#app')