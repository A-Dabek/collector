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

- plain-padlock - lock health for next card
- goldfish/djinn - wishes
- fisherman - random fish?
- exhume a card
- note with a sword - complete a task for points
- incognito - get a card without info
- time limit - lose hp? every second
- tick - drains life?
- ouroboros - play a card infitenly
- shop - buy a card for points
- parrot - same effect as previous
*/

export interface CardDefinition {
  rarity: Rarity;
  description: string;
}

export const LIBRARY: Record<string, CardDefinition> = {
  // common
  'card-pickup': {
    rarity: 'common',
    description: 'Draw 2',
  },
  pill: {
    rarity: 'common',
    description: 'Heal 5',
  },
  'paper-bag-open': {
    rarity: 'common',
    description: 'Expand 1',
  },
  'spikes-init': {
    rarity: 'common',
    description: 'Destroy random 1',
  },
  token: {
    rarity: 'common',
    description: 'Earn 1',
  },

  // uncommon - single effect
  'paper-bag-crumpled': {
    rarity: 'uncommon',
    description: 'Shrink 1',
  },
  'hammer-break': {
    rarity: 'uncommon',
    description: 'Destroy 1',
  },

  // uncommon - single common effect x2
  'card-2-diamonds': {
    rarity: 'uncommon',
    description: 'Draw 3',
  },
  medicines: {
    rarity: 'uncommon',
    description: 'Heal 10',
  },
  'shoulder-bag': {
    rarity: 'uncommon',
    description: 'Expand 2',
  },
  'spikes-half': {
    rarity: 'uncommon',
    description: 'Destroy random 2',
  },
  'two-coins': {
    rarity: 'uncommon',
    description: 'Earn 2',
  },

  // rare

  // epic

  // legendary

  // mythic
};
