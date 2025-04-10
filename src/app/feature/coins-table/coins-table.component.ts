import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { Coin } from '../../shared/interfaces/coin.interface';
import { select, Store } from '@ngrx/store';
import { CoinsActions } from '../../store/actions/action-types';
import {
  selectAllCoins,
  selectFilteredCoins,
  selectLoading,
  selectTotalFiltered,
} from '../../store/selectors/coins.selectors';
import { ChartData, ChartOptions, TooltipItem, ChartDataset } from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { CoinDataset } from '../../shared/interfaces/coin-dataset.interface';

@Component({
  selector: 'app-coins-table',
  imports: [SharedModule],
  templateUrl: './coins-table.component.html',
  styleUrl: './coins-table.component.scss',
})
export class CoinsTableComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private fb: FormBuilder = inject(FormBuilder);
  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  subs: Subscription[] = [];
  coins = signal<Coin[]>([]);
  loading = this.store.pipe(select(selectLoading));
  chartData = signal<ChartData<'bar'>>({ labels: [], datasets: [] });
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const dataset = ctx.chart.data.datasets[
              ctx.datasetIndex
            ] as CoinDataset;
            const coin = dataset.coins?.[ctx.dataIndex];

            if (!coin) {
              return 'Data unavailable';
            }
            // return `$${value.toLocaleString()}`;
            return [
              `Name: ${coin.name}`,
              `Market Cap: $${coin.market_cap.toLocaleString()}`,
              `Price: $${coin.current_price.toLocaleString()}`,
              `Volume: $${coin.total_volume.toLocaleString()}`,
              `24h Change: ${coin.price_change_percentage_24h.toFixed(2)}%`,
              `High 24h: $${coin.high_24h.toLocaleString()}`,
              `Low 24h: $${coin.low_24h.toLocaleString()}`,
              `% Change: $${coin.price_change_percentage_24h.toLocaleString()}`,
              `Circulating Supply: ${coin.circulating_supply.toLocaleString()}`,
            ];
          },
        },
      },
    },
    scales: {
      x: { title: { display: true, text: 'Cryptocurrency' } },
      y: {
        type: 'logarithmic',
        // beginAtZero: true,
        min: 1_000_000,
        title: { display: true, text: 'Market Cap (USD)' },
        ticks: {
          // callback: (value: any) => `$${(+value).toLocaleString()}`,
          callback: (value) => `$${Number(value).toLocaleString()}`,
        },
      },
    },
  };
  filterForm!: FormGroup;
  totalRecords = signal(0);
  perPage = signal(25);
  page = signal(1);

  constructor() {
    this.store.dispatch(CoinsActions.loadCoins({ page: 1 }));
    /**
     * Always show the top10 by market_cap regardless of filters/search/pagination,
     */
    effect(() => {
      this.store.select(selectAllCoins).subscribe((coins) => {
        this.chartInit(coins);
      });
    });

    effect(() => {
      this.store.select(selectFilteredCoins).subscribe((data) => {
        this.coins.set(data);
      });
    });

    effect(() => {
      this.store.select(selectTotalFiltered).subscribe((count) => {
        this.totalRecords.set(count);
      });
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * @description Initiliaze the chart with the top10 coins by market_cap
   */
  chartInit(coins: Coin[]): void {
    const top10 = [...coins]
      .sort((a, b) => b.market_cap - a.market_cap)
      .slice(0, 10);
    const labels = top10.map((c) => `${c.name} (${c.symbol})`);
    const data = top10.map((c) => c.market_cap);
    const dataset: CoinDataset = {
      label: 'Market Cap',
      data,
      backgroundColor: '#42A5F5',
      borderRadius: 4,
      coins: top10,
    };
    this.chartData.set({
      labels,
      datasets: [dataset],
    });
    this.cd.markForCheck();
  }

  /**
   * @description Initiliaze the form and check for value changes.
   */
  initForm(): void {
    this.filterForm = this.fb.group({
      symbol: [''],
      name: [''],
      market_cap: [null],
      global: [''],
    });

    this.subs.push(
      this.filterForm.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(
            (a, b) => JSON.stringify(a) === JSON.stringify(b)
          )
        )
        .subscribe(({ global, ...filters }) => {
          this.store.dispatch(
            CoinsActions.updateSearchTerm({ searchTerm: global ?? '' })
          );
          this.store.dispatch(CoinsActions.updateColumnFilters({ filters }));
        })
    );
  }

  /**
   * @description Returns the severity of the tag so the user to understand if the coin had bad or good 24hours change
   * @param value
   * @returns
   */
  getSeverity(value: number): 'success' | 'info' | 'warn' | 'danger' {
    if (value > 10) {
      return 'success';
    } else if (value > 0) {
      return 'info';
    } else if (value > -5) {
      return 'warn';
    } else {
      return 'danger';
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s?.unsubscribe());
  }
}
