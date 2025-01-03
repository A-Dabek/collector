import { Rarity } from '../../../ui/rarity';
import { AddHealthAction } from '../../actions/add-health.action';
import { GameState } from '../../logic/engine';
import { CardName } from '../access';
import { BasePlayableCard } from '../card';

export class MedicinesCard extends BasePlayableCard {
  override name: CardName = 'medicines';
  override rarity: Rarity = 'uncommon';
  override actions = [new AddHealthAction(10)];

  override enabled(state: GameState): boolean {
    return state.health < state.maxHealth;
  }
}
