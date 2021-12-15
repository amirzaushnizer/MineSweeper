import { combineReducers } from "redux";

import {
  ActionTypes,
  FirstMoveAction,
  GamePhaseAction,
  MarkAction,
  OpenSquaresAction,
} from "../actions";
import { GamePhase } from "../App";
import {
  initBombsMatrix,
  initBooleanMatrix,
  initOpenSquaresMatrix,
} from "../utils";
import { GAME_SIZE, NUM_OF_BOMBS } from "../constants";

const numOfBombsLeft = (
  bombsLeft: number = NUM_OF_BOMBS,
  action: MarkAction
) => {
  switch (action.type) {
    case ActionTypes.MarkSquare:
      return bombsLeft - 1;
    case ActionTypes.UnmarkSquare:
      return bombsLeft + 1;
    default:
      return bombsLeft;
  }
};

const gameSize = (gameSize: number = GAME_SIZE) => gameSize;

const gamePhase = (
  gamePhase: GamePhase = GamePhase.FirstClick,
  action: GamePhaseAction | FirstMoveAction
) => {
  switch (action.type) {
    case ActionTypes.FirstMove:
      return GamePhase.Playing;
    case ActionTypes.LoseGame:
      return GamePhase.Lose;
    case ActionTypes.WinGame:
      return GamePhase.Win;
    default:
      return gamePhase;
  }
};

const bombsSquares = (
  bombsSquares: boolean[][] = initBooleanMatrix(GAME_SIZE),
  action: FirstMoveAction
) => {
  switch (action.type) {
    case ActionTypes.FirstMove:
      return initBombsMatrix(
        GAME_SIZE,
        NUM_OF_BOMBS,
        action.payload.row,
        action.payload.col
      );
  }
};

const openSquares = (
  openSquares: number[][] = initOpenSquaresMatrix(GAME_SIZE),
  action: OpenSquaresAction
) => {
  switch (action.type) {
    case ActionTypes.OpenSquares:
      return action.payload.openSquares;
    default:
      return openSquares;
  }
};

export default combineReducers({
  numOfBombsLeft,
  gameSize,
  gamePhase,
  bombsSquares,
  openSquares,
});
