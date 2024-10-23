import { Rarity } from '../../ui/rarity';

/*
IDEAS
- goal: get X points for every space
- each level X+1

legendary: cost5 - only special
- play 5 random cards for free
- destroy a card and get a higher rarity card
- draw rare-less cards until space is full
- heal flat for every space available
mythic: cost6 - only super special
- missing HP is max HP, full heal
- add missing health as max HP
- re-roll all cards
- shrink spaces with each distinct rarity
- add 5 spaces with cards of every rarity
*/

export type CardEffectName =
  | 'heal'
  | 'draw'
  | 'expand'
  | 'destroy'
  | 'earn'
  | 'shrink';

export interface CardEffect {
  name: CardEffectName;
  repeats?: number;
  random?: boolean;
}

export interface CardDefinition {
  rarity: Rarity;
  effects: CardEffect[];
}

export const LIBRARY: Record<string, CardDefinition> = {
  // common
  'card-pickup': {
    rarity: 'common',
    effects: [{ name: 'draw', repeats: 1 }],
  },
  // pill: {
  //   rarity: 'common',
  //   effects: [{ name: 'heal', repeats: 1 }],
  // },
  // 'paper-bag-open': {
  //   rarity: 'common',
  //   effects: [{ name: 'expand', repeats: 1 }],
  // },
  // 'spikes-init': {
  //   rarity: 'common',
  //   effects: [{ name: 'destroy', random: true, repeats: 1 }],
  // },
  // token: {
  //   rarity: 'common',
  //   effects: [{ name: 'earn', repeats: 1 }],
  // },

  // uncommon - single effect
  // 'paper-bag-crumpled': {
  //   rarity: 'uncommon',
  //   effects: [{ name: 'shrink', random: true, repeats: 1 }],
  // },
  // 'hammer-break': {
  //   rarity: 'uncommon',
  //   effects: [{ name: 'destroy' }],
  // },

  // uncommon - single common effect x2
  // 'card-2-diamonds': {
  //   rarity: 'uncommon',
  //   effects: [{ name: 'draw', repeats: 2 }],
  // },
  // medicines: {
  //   rarity: 'uncommon',
  //   effects: [{ name: 'heal', repeats: 2 }],
  // },
  // 'shoulder-bag': {
  //   rarity: 'uncommon',
  //   effects: [{ name: 'expand', repeats: 2 }],
  // },
  // 'spikes-half': {
  //   rarity: 'uncommon',
  //   effects: [{ name: 'destroy', random: true, repeats: 2 }],
  // },
  // 'two-coins': {
  //   rarity: 'uncommon',
  //   effects: [{ name: 'earn', repeats: 2 }],
  // },

  // rare

  // epic

  // legendary

  // mythic
};
