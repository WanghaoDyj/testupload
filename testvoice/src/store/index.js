import Vue from 'vue';
import Vuex from 'vuex';
import storeList from './storeList';
import duration from './duration';

Vue.use(Vuex);
export default new Vuex.Store({
    modules:{
        storeList,
        duration
    }
});