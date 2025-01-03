import { Rarity } from '../../../ui/rarity';
import { AddHealthAction } from '../../actions/add-health.action';
import { CardName } from '../../library/library';
import { GameState } from '../../logic/engine';
import { BasePlayableCard } from '../card';

export class PillCard extends BasePlayableCard {
  override name: CardName = 'pill';
  override rarity: Rarity = 'common';
  override actions = [new AddHealthAction(10)];

  override enabled(state: GameState): boolean {
    return state.health < state.maxHealth;
  }
}
