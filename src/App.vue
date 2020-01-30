<template>
  <div id="app">
    <TicTacToeBoard />
  </div>
</template>

<script>
import TicTacToeBoard from './components/TicTacToeBoard';

export default {
  name: 'App',
  data() {
    return {
      msg: 'Message over here'
    };
  },
  methods: {},
  components: {
    TicTacToeBoard
  }
};
</script>

<style>
#app {
  font-family: 'Courier New', Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
