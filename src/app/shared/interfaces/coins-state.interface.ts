import { Coin } from './coin.interface';

export interface CoinsState {
  data: Coin[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filters: {
    name?: string;
    symbol?: string;
    market_cap?: number;
  };
}
