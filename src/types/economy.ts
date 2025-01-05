export interface UserWallet {
  id: string;
  balance: number;
  keys: number;
  username: string;
}

export interface MarketListing {
  id: string;
  sellerId: string;
  skinId: string;
  skin: Skin;
  keys: number;
  listedAt: Date;
  status: 'active' | 'sold' | 'cancelled';
}

export interface TradeOffer {
  id: string;
  fromUserId: string;
  toUserId: string;
  offerItems: Skin[];
  requestItems: Skin[];
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
}

export interface Transaction {
  id: string;
  fromUserId: string;
  toUserId: string;
  amount: number;
  type: 'market_sale' | 'key_purchase' | 'deposit' | 'withdrawal';
  itemId?: string;
  timestamp: Date;
}

// Prices in USD
export const ECONOMY_CONSTANTS = {
  KEY_PRICE: 2.49,
  MIN_LISTING_KEYS: 0.03,
  MAX_LISTING_KEYS: 2000.00,
  MARKET_FEE_PERCENTAGE: 0.15, // 15% fee like Steam
  MIN_DEPOSIT: 5.00,
  MAX_DEPOSIT: 1000.00,
}

export interface Case {
  id: string;
  name: string;
  description: string;
  keys: number;
  imageUrl: string;
  skins: Skin[];
}

export interface Skin {
  id: string;
  name: string;
  wear: string;
  rarity: string;
  keys: number;
  imageUrl: string;
}
