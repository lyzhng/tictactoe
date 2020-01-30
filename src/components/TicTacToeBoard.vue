<template>
  <div id="board">
    <p v-if="!isFinished">Player {{ currentMove }}, make your move!</p>
    <p v-else-if="isDraw">The game is a draw.</p>
    <p v-else>Player {{ toggledMove }} won!</p>
    <table>
      <tbody>
        <tr v-for="(row, i) in grid" :key="`row-${i}`">
          <td
            v-for="(tile, j) in row"
            :key="`tile-${i}${j}`"
            v-on="!isFinished ? { click: () => plot(i, j) } : {}"
          >{{ tile }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { store } from '../store';

export default {
  name: 'TicTacToeBoard',
  store,
  data() {
    return {
      grid: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      currentMove: 'X',
      errorMsg: '',
      showErrorMsg: false,
      isFinished: false,
      isDraw: false
    };
  },
  computed: {
    toggledMove() {
      return this.currentMove === 'X' ? 'O' : 'X';
    }
  },
  methods: {
    plot(row, tile) {
      if (this.isEmptyTile(row, tile)) {
        this.grid[row][tile] = this.currentMove;
        this.toggleCurrentMove();
        this.isFinished = this.isWinningMove(row, tile) || this.isFullBoard();
        this.isDraw = this.isFullBoard();
      } else {
        this.errorMsg = 'Error! Invalid move.';
        this.showErrorMsg = true;
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
      let first = this.grid[0][0];
      for (let i = 1; i < this.grid.length; i++) {
        if (first !== this.grid[i][i]) return false;
      }
      return first !== '';
    },
    isRightDiagWinningMove() {
      let first = this.grid[this.grid.length - 1][0];
      for (let i = 1, j = 1; i >= 0 && j < this.grid.length; i--, j++) {
        if (first !== this.grid[i][j]) return false;
      }
      return first !== '';
    },
    isHorWinningMove(row) {
      let first = this.grid[row][0];
      for (let i = 1; i < this.grid.length; i++) {
        if (first !== this.grid[row][i]) return false;
      }
      return first !== '';
    },
    isVertWinningMove(tile) {
      let first = this.grid[0][tile];
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
td {
  padding: 2em;
  border: 2px solid;
}
</style>
