import { PlayableCard } from './card';
import { CardPickupCard } from './card-pickup.card';
import { PillCard } from './pill.card';

export const PLAYABLE_LIBRARY: Record<string, PlayableCard> = {
  'card-pickup': new CardPickupCard(),
  pill: new PillCard(),
};
