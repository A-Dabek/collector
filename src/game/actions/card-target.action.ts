import { GameState } from '../logic/engine';
import { GameAction, ResponseActions } from './game-actions';
import { GameUiState } from './ui-actions';
import { Card } from '../library/access';
import { GameCard } from '../cards/card';
import { combineActions } from '../logic/dynamic-card';
import { TargetAction } from './target.action';

export class CardTargetAction implements GameAction {
  private readonly targetAction: TargetAction;

  constructor(
    private readonly targetDest: Card,
    private readonly targetSource: Card,
    private readonly playableTargetSource: GameCard,
  ) {
    this.targetAction = new TargetAction(targetDest);
  }

  update(state: GameUiState): GameUiState {
    return this.targetAction.update(state);
  }

  next(state: GameState) {
    return combineActions(state, [
      {
        next: (state) => ({
          nextState: this.update(state),
          uiActions: [this],
          persistenceActions: [],
        }),
      } as GameAction,
      {
        next: (state) =>
          this.playableTargetSource.target!(state, this.targetSource),
      } as GameAction,
    ]);
  }
}
