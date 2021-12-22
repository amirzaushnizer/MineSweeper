export enum GamePhase {
  FirstClick = 0,
  Playing = 1,
  Win = 2,
  Lose = 3,
}

export interface RootState {
  bombsLeft: number;
  gameSize: number;
  bombsSquares: boolean[][];
  openSquares: number[][];
  gamePhase: GamePhase;
}
