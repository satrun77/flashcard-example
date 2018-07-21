
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vuetify from 'vuetify'
import { Model } from 'vue-api-query'
import Event from './event-bus'
const SocialSharing = require('vue-social-sharing');
const LRU = require('lru-cache')

// inject global axios instance as http client to Model
Model.$http = axios

Vue.use(SocialSharing);

const themeCache = LRU({
    max: 10,
    maxAge: 1000 * 60 * 60 // 1 hour
})
Vue.use(Vuetify, {
    theme: {
        cyan: '#00B8D4',
        'light-blue': '#0091EA',
        red: '#FF1744',
        pink: '#C51162',
        blue: '#E040FB',
        teal: '#00BFA5',
        lime: '#AEEA00',
        green: '#00C853',
        yellow: '#FFD600',
        orange: '#FFAB00',

        primary: '#2c3e50',
        secondary: '#34495e',
        accent: '#9b59b6'
    },
    options: {
        minifyTheme: function (css) {
            return process.env.NODE_ENV === 'production'
                ? css.replace(/[\s|\r\n|\r|\n]/g, '')
                : css
        },
        themeCache
    }
})

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('category-list', require('./Components/CategoryList.vue'));
Vue.component('card-gallery', require('./Components/CardGallery.vue'));
Vue.component('card', require('./Components/Card.vue'));
Vue.component('login-form', require('./Components/LoginForm.vue'));
Vue.component('admin-list', require('./Components/AdminList.vue'));
Vue.component('card-form', require('./Components/CardForm.vue'));
Vue.component('category-form', require('./Components/CategoryForm.vue'));
Vue.component('admin-form', require('./Components/AdminForm.vue'));

const app = new Vue({
    el: '#app',
    data: {
        drawer: false
    },
    created() {
        Event.$on('edit-by-card', () => this.drawer = false);
        Event.$on('edit-by-category', () => this.drawer = false);
    },
});
