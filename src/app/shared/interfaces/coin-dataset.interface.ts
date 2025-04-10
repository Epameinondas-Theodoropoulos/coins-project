import { ChartDataset } from 'chart.js';
import { Coin } from './coin.interface';

export interface CoinDataset extends ChartDataset<'bar'> {
  coins: Coin[];
}
