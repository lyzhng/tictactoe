<template>
  <div id="app" class="has-background-black">
    <TicTacToeBoard />
  </div>
</template>

<script>
import TicTacToeBoard from './components/TicTacToeBoard';

export default {
  name: 'App',
  components: {
    TicTacToeBoard
  }
};
</script>

<style>
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
