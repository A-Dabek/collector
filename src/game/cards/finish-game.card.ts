import { CardWasteAllAction } from '../actions/basic/card-waste-all.action';
import { SetHealthAction } from '../actions/basic/set-health.action';
import { SetPointsAction } from '../actions/basic/set-points.action';
import { SetSpaceAction } from '../actions/basic/set-space.action';
import { GameState } from '../logic/engine';
import { CardName } from './access';
import { BasePlayableCard } from './card';

export class FinishGameCard extends BasePlayableCard {
  override name: CardName = 'card-2-diamonds';
  override rarity = 'common' as const;

  override costActions() {
    return [];
  }

  override play(state: GameState) {
    return [
      new SetPointsAction(0),
      new SetHealthAction(state.maxHealth),
      new CardWasteAllAction(),
      new SetSpaceAction(0),
    ];
  }
}
