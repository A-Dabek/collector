import { CardName } from '../library/library';
import { PlayableCard } from './card';
import { CardPickupCard } from './common/card-pickup.card';
import { PaperBagOpenCard } from './common/paper-bag-open.card';
import { PiggyBankCard } from './common/piggy-bank.card';
import { PillCard } from './common/pill.card';
import { SpikesInitCard } from './common/spikes-init.card';
import { TokenCard } from './common/token.card';
import { Card2DiamondsCard } from './uncommon/card-2-diamonds.card';
import { HammerBreakCard } from './uncommon/hammer-break.card';
import { MedicinesCard } from './uncommon/medicines.card';
import { PaperBagCrumpledCard } from './uncommon/paper-bag-crumpled.card';
import { ShoulderBagCard } from './uncommon/shoulder-bag.card';
import { SpikesHalfCard } from './uncommon/spikes-half.card';
import { TwoCoinsCard } from './uncommon/two-coins.card';

export const PLAYABLE_LIBRARY: Record<CardName, new () => PlayableCard> = {
  //common
  'card-pickup': CardPickupCard,
  pill: PillCard,
  'paper-bag-open': PaperBagOpenCard,
  'spikes-init': SpikesInitCard,
  token: TokenCard,
  'piggy-bank': PiggyBankCard,

  //uncommon
  'paper-bag-crumpled': PaperBagCrumpledCard,
  'card-2-diamonds': Card2DiamondsCard,
  medicines: MedicinesCard,
  'shoulder-bag': ShoulderBagCard,
  'spikes-half': SpikesHalfCard,
  'two-coins': TwoCoinsCard,
  'hammer-break': HammerBreakCard,
};
