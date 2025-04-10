import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoinsState } from '../../shared/interfaces/coins-state.interface';

export const selectCoinsState = createFeatureSelector<CoinsState>('coins');

export const selectAllCoins = createSelector(
  selectCoinsState,
  (state) => state.data
);

export const selectLoading = createSelector(
  selectCoinsState,
  (state) => state.loading
);

export const selectSearchTerm = createSelector(
  selectCoinsState,
  (state) => state.searchTerm
);

export const selectFilters = createSelector(
  selectCoinsState,
  (state) => state.filters
);

/**
 * Filtered data
 */
export const selectFilteredCoins = createSelector(
  selectAllCoins,
  selectSearchTerm,
  selectFilters,

  (coins, searchTerm, filters) => {
    let filtered = [...coins];

    // Global search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((coin) =>
        Object.values(coin).some((value) =>
          value?.toString().toLowerCase().includes(term)
        )
      );
    }

    // Column filters
    if (filters.symbol) {
      filtered = filtered.filter((c) =>
        c.symbol.toLowerCase().includes(filters.symbol!.toLowerCase())
      );
    }
    if (filters.name) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(filters.name!.toLowerCase())
      );
    }
    if (filters.market_cap) {
      filtered = filtered.filter((c) => c.market_cap >= filters.market_cap!);
    }

    return filtered;
  }
);

/**
 * Integer count only
 */
export const selectTotalFiltered = createSelector(
  selectAllCoins,
  selectSearchTerm,
  selectFilters,
  (coins, searchTerm, filters) => {
    let filtered = [...coins];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((coin) =>
        Object.values(coin).some((value) =>
          value?.toString().toLowerCase().includes(term)
        )
      );
    }
    if (filters.symbol) {
      filtered = filtered.filter((c) =>
        c.symbol.toLowerCase().includes(filters.symbol!.toLowerCase())
      );
    }
    if (filters.name) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(filters.name!.toLowerCase())
      );
    }
    if (filters.market_cap) {
      filtered = filtered.filter((c) => c.market_cap >= filters.market_cap!);
    }
    return filtered.length;
  }
);
