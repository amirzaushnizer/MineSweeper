import { Dispatch } from "redux";
import { RootState } from "../store-types";
import { openSquare } from "../../utils";
import { NUM_OF_BOMBS } from "../../constants";

export enum ActionTypes {
  MarkSquare = "MARK_SQUARE",
  UnmarkSquare = "UNMARK_SQUARE",
  FirstMove = "FIRST_MOVE",
  OpenSquares = "OPEN_SQUARES",
  LoseGame = "LOSE_GAME",
  WinGame = "WIN_GAME",
}

type GetState = () => RootState;

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

export const openSquares = (row: number, col: number) => {
  return (dispatch: Dispatch, getState: GetState) => {
    const state = getState();
    const openSquaresCopy = state.openSquares.map((arr) => arr.slice()); // create a snapshot of the current state
    openSquare(row, col, openSquaresCopy, state.bombsSquares);

    dispatch({
      type: ActionTypes.OpenSquares,
      payload: {
        openSquares: openSquaresCopy,
      },
    });

    const numOfClosedSquares = openSquaresCopy
      .flat()
      .filter((square) => square === -1).length;

    if (numOfClosedSquares === NUM_OF_BOMBS) {
      dispatch({
        type: ActionTypes.WinGame,
      });
    }
  };
};
