export const initOpenSquaresMatrix = (size: number) => {
  return Array(size)
    .fill(-1)
    .map(() => {
      return Array(size).fill(-1);
    });
};

export const initBombsMatrix = (gameSize: number, numOfBombs: number) => {
  const bombsMatrix = Array(gameSize)
    .fill(false)
    .map(() => {
      return Array(gameSize).fill(false);
    });
  for (let i = 0; i < numOfBombs; i++) {
    let bombInit = false;
    while (!bombInit) {
      const row = Math.floor(Math.random() * gameSize);
      const column = Math.floor(Math.random() * gameSize);
      if (!bombsMatrix[row][column]) {
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
