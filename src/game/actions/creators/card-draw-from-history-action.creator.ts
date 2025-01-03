import { GameState } from '../../logic/engine';
import { CardAddAction } from '../basic/card-add.action';
import { GameAction, GameActionCreator } from '../game-actions';

export class CardDrawFromHistoryActionCreator implements GameActionCreator {
  constructor(private readonly count: number) {}

  create(state: GameState): GameAction[] {
    const lastCardInHistory = state.cardHistory[state.cardHistory.length - 1];
    return [new CardAddAction([lastCardInHistory])];
  }

  get description(): string {
    return `Exhume (${this.count})`;
  }
}
