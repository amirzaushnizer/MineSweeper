export enum ActionTypes {
  MarkSquare = "MARK_SQUARE",
  UnmarkSquare = "UNMARK_SQUARE",
  FirstMove = "FIRST_MOVE",
  OpenSquares = "OPEN_SQUARES",
  LoseGame = "LOSE_GAME",
  WinGame = "WIN_GAME",
}

export interface MarkAction {
  type: ActionTypes;
}

export interface GamePhaseAction {
  type: ActionTypes;
}

export interface FirstMoveAction {
  type: ActionTypes;
  payload: {
    row: number;
    col: number;
  };
}

export interface OpenSquaresAction {
  type: ActionTypes;
  payload: {
    openSquares: number[][];
  };
}

export const markSquare = () => {
  return {
    type: ActionTypes.MarkSquare,
  };
};

export const unMarkSquare = () => {
  return {
    type: ActionTypes.UnmarkSquare,
  };
};

export const firstMove = (row: number, col: number) => {
  return {
    type: ActionTypes.FirstMove,
    payload: {
      row,
      col,
    },
  };
};

export const openSquares = (openSquares: number[][]) => {
  return {
    type: ActionTypes.OpenSquares,
    payload: {
      openSquares,
    },
  };
};

export const loseGame = () => {
  return {
    type: ActionTypes.LoseGame,
  };
};

export const winGame = () => {
  return {
    type: ActionTypes.WinGame,
  };
};
