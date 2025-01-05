export interface Skin {
  id: string;
  name: string;
  type: string;
  wear: 'Factory New' | 'Minimal Wear' | 'Field-Tested' | 'Well-Worn' | 'Battle-Scarred';
  rarity: 'Consumer' | 'Industrial' | 'Mil-Spec' | 'Restricted' | 'Classified' | 'Covert';
  price: number;
  imageUrl: string;
}

export interface Case {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  skins: Skin[];
}