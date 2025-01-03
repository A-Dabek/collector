import { GameCard } from './card';
import { CardPickupCard } from './common/card-pickup.card';
import { PaperBagOpenCard } from './common/paper-bag-open.card';
import { PillCard } from './common/pill.card';
import { SpikesInitCard } from './common/spikes-init.card';
import { TokenCard } from './common/token.card';
import { PiggyBankCard } from './piggy-bank.card';
import { PlainPadlockCard } from './plain-padlock.card';
import { Card2DiamondsCard } from './uncommon/card-2-diamonds.card';
import { HammerBreakCard } from './uncommon/hammer-break.card';
import { MedicinesCard } from './uncommon/medicines.card';
import { PaperBagCrumpledCard } from './uncommon/paper-bag-crumpled.card';
import { ShoulderBagCard } from './uncommon/shoulder-bag.card';
import { SpikesHalfCard } from './uncommon/spikes-half.card';
import { TwoCoinsCard } from './uncommon/two-coins.card';
import { RaiseZombieCard } from './raise-zombie.card';

/*
(feasible)
- increase luck
- die - get a card of same rarity or not
- note with a sword - complete a task for points
- add 5 spaces with cards of every rarity
- play 5 random cards for free
- destroy a card and get a higher rarity card
- draw rare-less cards until space is full
- heal flat for every space available
- missing HP is max HP, full heal
- add missing health as max HP
- re-roll all cards
- shrink spaces with each distinct rarity

(needs play history)
- exhume a card
- parrot - same effect as previous

(needs targeting)
- ouroboros - play a card infinitely as long as it's possible (needs targetting)

(needs options)
- shop - buy a card for points
- goldfish/djinn - wishes

(unknown)
- fisherman - random fish?
- incognito - get a card without info
- time limit - lose hp? every second
- tick - drains life?
- chessboard - add chess pieces
*/

export type CardName =
  // common
  | 'card-pickup'
  | 'pill'
  | 'paper-bag-open'
  | 'spikes-init'
  | 'token'
  | 'plain-padlock'
  | 'piggy-bank' //FIXME not common

  // uncommon
  | 'paper-bag-crumpled'
  | 'hammer-break'
  | 'card-2-diamonds'
  | 'medicines'
  | 'shoulder-bag'
  | 'spikes-half'
  | 'two-coins'
  | 'raise-zombie';

export const PLAYABLE_LIBRARY: Record<CardName, new () => GameCard> = {
  //common
  'card-pickup': CardPickupCard,
  pill: PillCard,
  'paper-bag-open': PaperBagOpenCard,
  'spikes-init': SpikesInitCard,
  token: TokenCard,
  'piggy-bank': PiggyBankCard,
  'plain-padlock': PlainPadlockCard,

  //uncommon
  'paper-bag-crumpled': PaperBagCrumpledCard,
  'card-2-diamonds': Card2DiamondsCard,
  medicines: MedicinesCard,
  'shoulder-bag': ShoulderBagCard,
  'spikes-half': SpikesHalfCard,
  'two-coins': TwoCoinsCard,
  'hammer-break': HammerBreakCard,
  'raise-zombie': RaiseZombieCard,
};
