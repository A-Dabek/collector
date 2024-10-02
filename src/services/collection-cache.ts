export const COLLECTION_CACHE = {
  // Private cache to store items
  _cache: new Map<string, number>(),

  itemExists(id: string, maxRarity: number): boolean {
    // console.log(
    //   id,
    //   maxRarity,
    //   'known rarity',
    //   this._cache.get(id),
    //   this._cache.has(id) && (this._cache.get(id) as number) >= maxRarity,
    // );
    return this._cache.has(id) && (this._cache.get(id) as number) >= maxRarity;
  },

  addItem(id: string, rarity: number): void {
    // console.log(id, rarity);
    this._cache.set(id, rarity);
  },
};
