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
  bitcoinBs = <QuoteBs> {};
  etherBs = <QuoteBs> {};
  ltcBs = <QuoteBs> {};
  rippleBs = <QuoteBs> {};
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private bitStampServ: BitstampService) {
  }

  ionViewDidLoad() {
    this.bitStampServ.getCurrentQuote(this.bitStampServ.BTCUSD).subscribe(quote => this.bitcoinBs = quote);
    this.bitStampServ.getCurrentQuote(this.bitStampServ.ETHUSD).subscribe(quote => this.etherBs = quote);
    this.bitStampServ.getCurrentQuote(this.bitStampServ.LTCUSD).subscribe(quote => this.ltcBs = quote);
    this.bitStampServ.getCurrentQuote(this.bitStampServ.XRPUSD).subscribe(quote => this.rippleBs = quote);
    console.log('ionViewDidLoad QuotesPage');
  }

}
