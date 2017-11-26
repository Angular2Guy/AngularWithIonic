import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BitstampService } from '../../app/services/bitstamp.service';
import { QuoteBs } from '../../app/common/quoteBs';
import { OrderbookBs } from '../../app/common/orderbookBs';
/**
 * Generated class for the QuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage {
  bitcoinQuote = 0.0;
  etherQuote = 0.0;
  ltcQuote = 0.0;
  rippleQuote = 0.0;
    
    
  constructor(public navCtrl: NavController, public navParams: NavParams, private bitStampServ: BitstampService) {
  }

  ionViewDidLoad() {
    this.bitStampServ.getCurrentQuote(this.bitStampServ.BTCUSD).subscribe(quote => this.bitcoinQuote = quote.last);
    this.bitStampServ.getCurrentQuote(this.bitStampServ.ETHUSD).subscribe(quote => this.etherQuote = quote.last);
    this.bitStampServ.getCurrentQuote(this.bitStampServ.LTCUSD).subscribe(quote => this.ltcQuote = quote.last);
    this.bitStampServ.getCurrentQuote(this.bitStampServ.XRPUSD).subscribe(quote => this.rippleQuote = quote.last);
    console.log('ionViewDidLoad QuotesPage');
  }

}
