import { rarities, Rarity } from '../../ui/rarity';
import { PLAYABLE_LIBRARY } from '../cards/access';
import { PlayableCard } from '../cards/card';
import { CardName } from './library';

export function findCardInLibrary(name: CardName): PlayableCard {
  return new PLAYABLE_LIBRARY[name]();
}

export function getRandomCardName(): CardName {
  const rarity = rarities[getRarity()];
  return findRandomCardOfRarity(rarity);
}

function findRandomCardOfRarity(rarity: Rarity): CardName {
  const cardNames = Object.keys(PLAYABLE_LIBRARY).filter(
    (key) => new PLAYABLE_LIBRARY[key as CardName]().rarity === rarity,
  ) as CardName[];
  const randomIndex = Math.floor(Math.random() * cardNames.length);
  return cardNames[randomIndex];
}

function getRarity(): number {
  const decreasingFactor = 2;

  const calculateBaseProbability = (factor: number): number => {
    const sumInversePowers = Array(6)
      .fill(0)
      .reduce((sum, _, i) => sum + 1 / Math.pow(factor, i), 0);
    return 1 / sumInversePowers;
  };

  const normalizeProbabilities = (factor: number): number[] => {
    const baseProbability = calculateBaseProbability(factor);
    return Array(6)
      .fill(0)
      .map((_, i) => baseProbability / Math.pow(factor, i));
  };

  const probabilities = normalizeProbabilities(decreasingFactor);
  const randomValue = Math.random();
  let cumulativeProbability = 0;

  for (let i = 0; i < probabilities.length; i++) {
    cumulativeProbability += probabilities[i];
    if (randomValue <= cumulativeProbability) {
      return i;
    }
  }

  return 0; // Default case, though it shouldn't happen
}
