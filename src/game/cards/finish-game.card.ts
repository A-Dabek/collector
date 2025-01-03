import { CardWasteAllAction } from '../actions/card-waste-all.action';
import { SetHealthAction } from '../actions/set-health.action';
import { SetPointsAction } from '../actions/set-points.action';
import { SetSpaceAction } from '../actions/set-space.action';
import { CardName } from '../library/library';
import { GameState } from '../logic/engine';
import { BasePlayableCard } from './card';

export class FinishGameCard extends BasePlayableCard {
  override name: CardName = 'card-2-diamonds';
  override rarity = 'common' as const;

  override play(state: GameState) {
    return [
      new SetPointsAction(0),
      new SetHealthAction(state.maxHealth),
      new CardWasteAllAction(),
      new SetSpaceAction(0),
    ];
  }
}
