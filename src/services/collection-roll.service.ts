import { Injectable } from '@angular/core';
import iconCollection from '../../assets/result.json';

@Injectable({ providedIn: 'root' })
export class CollectionRollService {
  getRandomItem(): {
    name: string;
    rarity: number;
  } {
    const keys = Object.keys(iconCollection);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    const rarity = this.getRarity();

    return { name: randomKey, rarity: rarity };
  }

  private getRarity = (): number => {
    const decreasingFactor = 10; // Change this to 5 if probabilities should be 5x less likely
    const baseProbability = 0.9;
    const probabilities = Array(6)
      .fill(0)
      .map((_, i) => baseProbability / Math.pow(decreasingFactor, i));

    const randomValue = Math.random();
    console.log(randomValue, probabilities);
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
