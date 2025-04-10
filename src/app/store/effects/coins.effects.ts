import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { CoinsService } from '../../shared/services/coins.service';
import { CoinsActions } from '../actions/action-types';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlingService } from '../../shared/services/error-handling.service';

@Injectable()
export class CoinsEffects {
  private coinsService: CoinsService = inject(CoinsService);
  private actions$: Actions = inject(Actions);

  loadCoins$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoinsActions.loadCoins),
      switchMap(() =>
        this.coinsService.getCoins().pipe(
          map((coins) => CoinsActions.coinsLoadedSuccess({ coins })),
          catchError((error: HttpErrorResponse) => {
            return of(CoinsActions.coinsLoadedFailure({ error: error }));
          })
        )
      )
    )
  );
}
