import { Injectable } from '@angular/core';
import iconCollection from '../../assets/result.json';
import { ItemId } from './collection-persistence.service';

@Injectable({ providedIn: 'root' })
export class CollectionRollService {
  getRandomItem(): ItemId {
    const keys = Object.keys(iconCollection);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const rarity = this.getRarity();

    return { id: randomKey, rarity };
  }

  private getRarity = (): number => {
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
    console.log(probabilities);

    const randomValue = Math.random();
    let cumulativeProbability = 0;

    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProbability += probabilities[i];
      if (randomValue <= cumulativeProbability) {
        return i;
      }
    }

    return 0; // Default case, though it shouldn't happen
  };
}
