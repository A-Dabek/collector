export type Rarity =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'epic'
  | 'legendary'
  | 'mythic';

export const rarityColors: Record<Rarity, string> = {
  common: '#D3D3D3', // LighterLightGray
  uncommon: '#228B22', // DimDarkGreen
  rare: '#4169E1', // RoyalBlue
  epic: '#8A2BE2', // BlueViolet
  legendary: '#FFD700', // Gold
  mythic: '#DC143C', // Crimson Mythic Red
};

export const rarities = Object.keys(rarityColors) as Rarity[];
