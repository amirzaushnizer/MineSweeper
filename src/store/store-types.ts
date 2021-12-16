import { GamePhase } from "../App";

export interface RootState {
  bombsLeft: number;
  gameSize: number;
  bombsSquares: boolean[][];
  openSquares: number[][];
  gamePhase: GamePhase;
}
