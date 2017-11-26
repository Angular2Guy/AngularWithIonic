import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BitstampService } from '../../app/services/bitstamp.service';
import { BitfinexService } from '../../app/services/bitfinex.service';
import { QuoteBs } from '../../app/common/quoteBs';
import { QuoteBf } from '../../app/common/quoteBf';
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
  
  bitcoinBf = <QuoteBf> {};
  etherBf = <QuoteBf> {};
  ltcBf = <QuoteBf> {};
  rippleBf = <QuoteBf> {};
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private bitstampServ: BitstampService, private bitfinexServ: BitfinexService) {
  }

  ionViewDidLoad() {
    this.bitstampServ.getCurrentQuote(this.bitstampServ.BTCUSD).subscribe(quote => this.bitcoinBs = quote);
    this.bitstampServ.getCurrentQuote(this.bitstampServ.ETHUSD).subscribe(quote => this.etherBs = quote);
    this.bitstampServ.getCurrentQuote(this.bitstampServ.LTCUSD).subscribe(quote => this.ltcBs = quote);
    this.bitstampServ.getCurrentQuote(this.bitstampServ.XRPUSD).subscribe(quote => this.rippleBs = quote);
    this.bitfinexServ.getCurrentQuote(this.bitfinexServ.BTCUSD).subscribe(quote => this.bitcoinBf = quote);
    this.bitfinexServ.getCurrentQuote(this.bitfinexServ.ETHUSD).subscribe(quote => this.etherBf = quote);
    this.bitfinexServ.getCurrentQuote(this.bitfinexServ.LTCUSD).subscribe(quote => this.ltcBf = quote);
    this.bitfinexServ.getCurrentQuote(this.bitfinexServ.XRPUSD).subscribe(quote => this.rippleBf = quote);
    console.log('ionViewDidLoad QuotesPage');
  }

}
