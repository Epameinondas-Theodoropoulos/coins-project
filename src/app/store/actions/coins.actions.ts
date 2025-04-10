import { createAction, props } from '@ngrx/store';
import { Coin } from '../../shared/interfaces/coin.interface';
import { HttpErrorResponse } from '@angular/common/http';

export const loadCoins = createAction(
  '[COINS] LOAD COINS',
  props<{ page: number }>()
);

export const coinsLoadedSuccess = createAction(
  '[COINS] LOADED SUCCESS',
  props<{ coins: Coin[] }>()
);

export const coinsLoadedFailure = createAction(
  '[COINS] LOADED FAILURE',
  props<{ error: HttpErrorResponse }>()
);

export const updateSearchTerm = createAction(
  '[COINS] UPDATE SEARCH TERM',
  props<{ searchTerm: string }>()
);

export const updateColumnFilters = createAction(
  '[COINS] UPDATE COLUMN FILTERS',
  props<{ filters: { name?: string; symbol?: string; market_cap?: number } }>()
);
