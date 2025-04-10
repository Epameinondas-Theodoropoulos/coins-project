import { ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { CoinsState } from '../../shared/interfaces/coins-state.interface';

export interface AppState {
  coins: CoinsState;
}

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    console.log('state before: ', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
