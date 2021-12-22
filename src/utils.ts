import { NUM_OF_BOMBS } from "./constants";
import { GamePhase } from "./store/store-types";

export const initOpenSquaresMatrix = (size: number) => {
  return Array(size)
    .fill(-1)
    .map(() => {
      return Array(size).fill(-1);
    });
};

export const initBooleanMatrix = (size: number) => {
  return Array(size)
    .fill(false)
    .map(() => {
      return Array(size).fill(false);
    });
};
export const isUserClickLocation = (
  userClickLocation: number[],
  row: number,
  col: number
) => {
  return row === userClickLocation[0] && col === userClickLocation[1];
};
export const isIlegalBombLocation = (
  bombsMatrix: boolean[][],
  row: number,
  col: number,
  userClickLocation: number[]
) => {
  return (
    bombsMatrix[row][col] || isUserClickLocation(userClickLocation, row, col)
  );
};

export const initBombsMatrix = (
  gameSize: number,
  numOfBombs: number,
  rowFirstClick: number,
  colFirstClick: number
) => {
  const bombsMatrix = initBooleanMatrix(gameSize);
  for (let i = 0; i < numOfBombs; i++) {
    let bombInit = false;
    while (!bombInit) {
      const row = Math.floor(Math.random() * gameSize);
      const column = Math.floor(Math.random() * gameSize);
      if (
        !isIlegalBombLocation(bombsMatrix, row, column, [
          rowFirstClick,
          colFirstClick,
        ])
      ) {
        bombsMatrix[row][column] = true;
        bombInit = true;
      }
    }
  }

  return bombsMatrix;
};

//fun with indexes
export const getSquareNeighbors = (
  row: number,
  col: number,
  gridSize: number
) => {
  const neighbors: number[][] = [];
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (!(i === row && j === col)) {
        if (i > -1 && j > -1 && i < gridSize && j < gridSize) {
          neighbors.push([i, j]);
        }
      }
    }
  }

  return neighbors;
};

export const zeroPadNumber = (n: number) => {
  let output = n.toString();
  if (output.length < 2) {
    output = "0" + output;
  }
  return output;
};

export const secondsToTimestamp = (seconds: number) => {
  const sec = seconds % 60;
  const minutes = Math.floor(seconds / 60) % 60;
  const hours = Math.floor(minutes / 60) % 24;
  return `${zeroPadNumber(hours)}:${zeroPadNumber(minutes)}:${zeroPadNumber(
    sec
  )}`;
};

export const openSquare = (
  row: number,
  col: number,
  newMatrix: number[][],
  bombsSquaresMat: boolean[][]
) => {
  if (newMatrix[row][col] < 0) {
    // if current square not open
    newMatrix[row][col] = calcNumOfAdjacentBombs(row, col, bombsSquaresMat);

    if (newMatrix[row][col] === 0) {
      // if all neighbors are clear, open them recursively
      const neighbors = getSquareNeighbors(row, col, newMatrix.length);
      neighbors.forEach((neighbor) => {
        openSquare(neighbor[0], neighbor[1], newMatrix, bombsSquaresMat);
      });
    }
  }
};

export const calcNumOfAdjacentBombs = (
  row: number,
  col: number,
  bombsSquaresMat: boolean[][]
): number => {
  const neighbors = getSquareNeighbors(row, col, bombsSquaresMat.length);
  return neighbors.filter(
    (neighbor) => bombsSquaresMat[neighbor[0]][neighbor[1]]
  ).length;
};

export const isGameOver = (gamePhase: GamePhase) => {
  return gamePhase === GamePhase.Win || gamePhase === GamePhase.Lose;
};

export const isWin = (openSquares: number[][]) =>
  openSquares.flat().filter((square) => square === -1).length === NUM_OF_BOMBS;
