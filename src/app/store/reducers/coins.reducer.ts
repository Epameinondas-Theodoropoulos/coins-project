import { createReducer, on } from '@ngrx/store';
import { CoinsState } from '../../shared/interfaces/coins-state.interface';
import * as CoinsActions from '../actions/coins.actions';

/**
 * Initial State of the app
 */
const initialState: CoinsState = {
  data: [],
  loading: false,
  error: null,
  searchTerm: '',
  filters: {},
};

export const coinsReducer = createReducer(
  initialState,
  on(CoinsActions.loadCoins, (state, { page }) => {
    return { ...state, loading: true, page, error: null };
  }),
  on(CoinsActions.coinsLoadedSuccess, (state, { coins }) => {
    return { ...state, loading: false, data: coins };
  }),
  on(CoinsActions.coinsLoadedFailure, (state, { error }) => {
    return { ...state, loading: false, error: error.message };
  }),
  on(CoinsActions.updateSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),
  on(CoinsActions.updateColumnFilters, (state, { filters }) => ({
    ...state,
    filters,
  }))
);
