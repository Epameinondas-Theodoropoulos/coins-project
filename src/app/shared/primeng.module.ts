import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { FieldsetModule } from 'primeng/fieldset';
import { NgModule } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [],
  imports: [
    TableModule,
    InputNumberModule,
    MessagesModule,
    MessageModule,

    ToastModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,
    FieldsetModule,
    PaginatorModule,
    ChartModule,
    TagModule,
  ],
  exports: [
    TableModule,
    InputNumberModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    TooltipModule,
    InputTextModule,
    ButtonModule,
    FieldsetModule,
    PaginatorModule,
    ChartModule,
    TagModule,
  ],
})
export class PrimeNgModules {}
