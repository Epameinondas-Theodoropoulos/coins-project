import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { Coin } from '../interfaces/coin.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CoinsService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getCoins(): Observable<any> {
    const params = {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 250,
      page: 1,
      sparkline: 'false',
    };
    return this.http.get<Coin[]>(environment.endpoint.coinsMarkets, { params });
  }
}
