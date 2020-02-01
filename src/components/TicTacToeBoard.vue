<template>
  <div id="board" class="container has-text-centered">
    <div id="logistics" class="subtitle is-2 has-text-white">
      <p v-if="!isFinished">Player {{ currentMove }}, it's your turn.</p>
      <p v-else-if="isDraw">The game is a draw.</p>
      <p v-else>Player {{ toggledMove }} won!</p>
    </div>
    <table class="container">
      <tbody>
        <tr v-for="(row, i) in grid" :key="`row-${i}`">
          <td
            v-for="(tile, j) in row"
            :key="`tile-${i}${j}`"
            v-on="!isFinished ? { click: () => plot(i, j) } : {}"
            class="has-text-white"
          >{{ tile }}</td>
        </tr>
      </tbody>
    </table>
    <div class="button-container">
      <b-button @click="undo" :disabled="isEmptyMoveHistory || isFinished">Undo</b-button>
      <b-button @click="redo" :disabled="isEmptyUndoHistory">Redo</b-button>
      <b-button @click="reset">Reset</b-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default {
  name: 'TicTacToeBoard',
  data() {
    return {
      grid: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      currentMove: 'X',
      isFinished: false,
      isDraw: false
    };
  },
  computed: {
    toggledMove() {
      return this.currentMove === 'X' ? 'O' : 'X';
    },
    ...mapGetters([
      'isEmptyMoveHistory',
      'isEmptyUndoHistory',
      'lastMove',
      'lastUndoMove'
    ])
  },
  methods: {
    reset() {
      this.$store.dispatch('reset');
      for (let i = 0; i < this.grid.length; i++)
        for (let j = 0; j < this.grid[i].length; j++)
          Vue.set(this.grid[i], j, '');
      this.currentMove = 'X';
      this.isFinished = this.isDraw = false;
    },
    redo() {
      if (!this.lastUndoMove) return;
      const { currentMove, row, tile } = this.lastUndoMove.info;
      Vue.set(this.grid[row], tile, currentMove);
      this.toggleCurrentMove();
      this.$store.commit({
        type: 'addToMoveHistory',
        info: { currentMove, row, tile }
      });
      this.$store.commit('removeFromUndoHistory');
    },
    undo() {
      if (!this.lastMove) return;
      const { currentMove, row, tile } = this.lastMove.info;
      Vue.set(this.grid[row], tile, '');
      this.currentMove = currentMove;
      this.$store.commit('removeFromMoveHistory');
      this.$store.commit({
        type: 'addToUndoHistory',
        info: { currentMove, row, tile }
      });
    },
    plot(row, tile) {
      if (this.lastUndoMove) this.$store.commit('deleteUndoHistory');
      if (this.isEmptyTile(row, tile)) {
        Vue.set(this.grid[row], tile, this.currentMove);
        this.$store.commit({
          type: 'addToMoveHistory',
          info: {
            currentMove: this.currentMove,
            row,
            tile
          }
        });
        this.toggleCurrentMove();
        this.isFinished = this.isWinningMove(row, tile) || this.isFullBoard();
        this.isDraw = this.isFullBoard();
      }
    },
    toggleCurrentMove() {
      this.currentMove = this.toggledMove;
    },
    isEmptyTile(row, tile) {
      return this.grid[row][tile] === '';
    },
    isWinningMove(row, tile) {
      return (
        this.isDiagWinningMove() ||
        this.isHorWinningMove(row) ||
        this.isVertWinningMove(tile)
      );
    },
    isDiagWinningMove() {
      return this.isLeftDiagWinningMove() || this.isRightDiagWinningMove();
    },
    isLeftDiagWinningMove() {
      const first = this.grid[0][0];
      for (let i = 1; i < this.grid.length; i++) {
        if (first !== this.grid[i][i]) return false;
      }
      return first !== '';
    },
    isRightDiagWinningMove() {
      const first = this.grid[this.grid.length - 1][0];
      for (let i = 1, j = 1; i >= 0 && j < this.grid.length; i--, j++) {
        if (first !== this.grid[i][j]) return false;
      }
      return first !== '';
    },
    isHorWinningMove(row) {
      const first = this.grid[row][0];
      for (let i = 1; i < this.grid.length; i++) {
        if (first !== this.grid[row][i]) return false;
      }
      return first !== '';
    },
    isVertWinningMove(tile) {
      const first = this.grid[0][tile];
      for (let i = 1; i < this.grid.length; i++) {
        if (first !== this.grid[i][tile]) return false;
      }
      return first !== '';
    },
    isFullBoard() {
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          if (this.grid[i][j] === '') {
            return false;
          }
        }
      }
      return true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#board {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
}
.button-container {
  margin: 2rem;
}
.button {
  margin: 0 0.5rem;
}
table {
  width: 400px;
  table-layout: fixed;
}
td {
  padding: 3.5rem;
  border: 2px solid;
}
td::after {
  content: '\00A0';
}
</style>
