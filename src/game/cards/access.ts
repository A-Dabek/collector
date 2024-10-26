import { PlayableCard } from './card';
import { CardPickupCard } from './common/card-pickup.card';
import { PaperBagOpenCard } from './common/paper-bag-open.card';
import { PillCard } from './common/pill.card';
import { SpikesInitCard } from './common/spikes-init.card';
import { TokenCard } from './common/token.card';
import { Card2DiamondsCard } from './uncommon/card-2-diamonds.card';
import { MedicinesCard } from './uncommon/medicines.card';
import { PaperBagCrumpledCard } from './uncommon/paper-bag-crumpled.card';
import { ShoulderBagCard } from './uncommon/shoulder-bag.card';
import { SpikesHalfCard } from './uncommon/spikes-half.card';
import { TwoCoinsCard } from './uncommon/two-coins.card';

export const PLAYABLE_LIBRARY: Record<string, PlayableCard> = {
  //common
  'card-pickup': new CardPickupCard(),
  pill: new PillCard(),
  'paper-bag-open': new PaperBagOpenCard(),
  'spikes-init': new SpikesInitCard(),
  token: new TokenCard(),

  //uncommon
  'paper-bag-crumpled': new PaperBagCrumpledCard(),
  'card-2-diamonds': new Card2DiamondsCard(),
  medicines: new MedicinesCard(),
  'shoulder-bag': new ShoulderBagCard(),
  'spikes-half': new SpikesHalfCard(),
  'two-coins': new TwoCoinsCard(),
};
