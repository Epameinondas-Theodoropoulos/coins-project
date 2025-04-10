import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNgModules } from './shared/primeng.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PrimeNgModules],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
