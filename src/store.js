import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        moveHistory: []
    },
    getters: {
        lastMove(state) {
            return state.moveHistory.length !== 0 ? state.moveHistory[state.moveHistory.length - 1] : null;
        },
    },
    mutations: {
        addToMoveHistory(state, payload) {
            state.moveHistory.push(payload);
        },
        removeFromMoveHistory(state) {
            state.moveHistory.pop();
        },
        reset(state) {
            state.moveHistory.splice(0);
        }
    },
});