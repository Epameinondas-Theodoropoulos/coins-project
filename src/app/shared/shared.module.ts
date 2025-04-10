import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModules } from './primeng.module';

@NgModule({
  imports: [CommonModule, FormsModule, PrimeNgModules, ReactiveFormsModule],
  exports: [CommonModule, FormsModule, PrimeNgModules, ReactiveFormsModule],
})
export class SharedModule {}
