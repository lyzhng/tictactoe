import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        moveHistory: [],
        undoHistory: []
    },
    getters: {
        lastMove(state, getters) {
            return !getters.isEmptyMoveHistory ? state.moveHistory[state.moveHistory.length - 1] : null;
        },
        lastUndoMove(state, getters) {
            return !getters.isEmptyUndoHistory ? state.undoHistory[state.undoHistory.length - 1] : null;
        },
        isEmptyMoveHistory(state) {
            return state.moveHistory.length === 0;
        },
        isEmptyUndoHistory(state) {
            return state.undoHistory.length === 0;
        }
    },
    mutations: {
        addToMoveHistory(state, payload) {
            state.moveHistory.push(payload);
        },
        removeFromMoveHistory(state) {
            state.moveHistory.pop();
        },
        deleteMoveHistory(state) {
            state.moveHistory.splice(0);
        },
        addToUndoHistory(state, payload) {
            state.undoHistory.push(payload);
        },
        removeFromUndoHistory(state) {
            state.undoHistory.pop();
        },
        deleteUndoHistory(state) {
            state.undoHistory.splice(0);
        }
    },
    actions: {
        reset(context) {
            context.commit('deleteMoveHistory');
            context.commit('deleteUndoHistory');
        }
    }
});