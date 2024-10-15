import { rarities, Rarity } from '../../ui/rarity';
import { LIBRARY } from './library';

export interface Card {
  name: string;
  rarity: Rarity;
  cost: number;
  description: string;
}

export function findCardInLibrary(name: string): Card {
  const libraryCard = LIBRARY[name];
  return {
    name,
    cost: rarities.findIndex((item) => item === libraryCard.rarity) + 1,
    rarity: libraryCard.rarity,
    description: libraryCard.effects
      .map((effect) => `${effect.name} (${effect.repeats})`)
      .join(' '),
  };
}

export function getRandomCard(): Card {
  const rarity = rarities[getRarity()];
  console.log({ rarity });
  const randomKey = findRandomCardOfRarity(rarity);
  return findCardInLibrary(randomKey);
}

function findRandomCardOfRarity(rarity: Rarity): string {
  const cardNames = Object.keys(LIBRARY).filter(
    (key) => LIBRARY[key].rarity === rarity,
  );
  const randomIndex = Math.floor(Math.random() * cardNames.length);
  return cardNames[randomIndex];
}

function getRarity(): number {
  const decreasingFactor = 10;

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
  console.log({ probabilities });

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