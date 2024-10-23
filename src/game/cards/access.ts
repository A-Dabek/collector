import { PlayableCard } from './card';
import { CardPickupCard } from './card-pickup.card';

export const PLAYABLE_LIBRARY: Record<string, PlayableCard> = {
  'card-pickup': new CardPickupCard(),
};
