import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuotedetailPage } from './quotedetail';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    QuotedetailPage,
  ],
  imports: [
    ChartsModule,
    IonicPageModule.forChild(QuotedetailPage),
  ],
})
export class QuotedetailPageModule {}
