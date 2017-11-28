import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderbookPage } from './orderbook';

@NgModule({
  declarations: [
    OrderbookPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderbookPage),
  ]
})
export class OrderbookPageModule {}
