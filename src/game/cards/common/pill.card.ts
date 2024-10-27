import { ResponseActions } from '../../actions/game-actions';
import { GameState } from '../../logic/engine';
import { PlayableCard } from '../card';
import { AddHealthAction } from '../../actions/add-health.action';
import { Card } from '../../library/access';

export class PillCard implements PlayableCard {
  play(state: GameState, card: Card): ResponseActions {
    return new AddHealthAction(10).next(state);
  }

  enabled(state: GameState): boolean {
    return state.health < state.maxHealth;
  }
}
