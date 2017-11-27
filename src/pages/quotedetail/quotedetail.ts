import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BitstampService } from '../../app/services/bitstamp.service';
import { BitfinexService } from '../../app/services/bitfinex.service';
import { QuoteBs } from '../../app/common/quoteBs';
import { QuoteBf } from '../../app/common/quoteBf';

/**
 * Generated class for the QuotedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quotedetail',
  templateUrl: 'quotedetail.html',
})
export class QuotedetailPage {
  quoteBs = <QuoteBs> {};
  quoteBf = <QuoteBf> {};
  todayQuotesBs = <QuoteBs[]> [];
  todayQuotesBf = <QuoteBf[]> [];
  exchange: string;
  chartdata: number[] = [];
  chartlabels: string[] = [];
  chartType = "line";
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private bitstampServ: BitstampService, private bitfinexServ: BitfinexService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuotedetailPage');
    this.quoteBf = <QuoteBf> {};
    this.quoteBs = <QuoteBs> {};
    this.chartdata = [];
    this.chartlabels = [];
    this.exchange = this.navParams.get('exchange');
    if('bitstamp' === this.exchange) {
        console.log("bitstamp"+" "+this.navParams.get('currency'));
        this.bitstampServ.getCurrentQuote(this.navParams.get('currency')).subscribe(quote => this.quoteBs = quote);
        this.bitstampServ.getTodayQuotes(this.navParams.get('currency')).subscribe(quotes => {
            this.todayQuotesBs = quotes;
            this.chartlabels = this.todayQuotesBs.map(quote => new Date(quote.createdAt).getMinutes().toString());
            this.chartdata = this.todayQuotesBs.map(quote => quote.last);
        });
    } else if('bitfinex' === this.exchange) {
        console.log("bitfinex"+" "+this.navParams.get('currency'));
        this.bitfinexServ.getCurrentQuote(this.navParams.get('currency')).subscribe(quote => this.quoteBf = quote);
        this.bitfinexServ.getTodayQuotes(this.navParams.get('currency')).subscribe(quotes => {
            this.todayQuotesBf = quotes;
            this.chartlabels = this.todayQuotesBf.map(quote => new Date(quote.createdAt).getMinutes().toString());
            this.chartdata = this.todayQuotesBf.map(quote => quote.last_price);
        });
    }
  }

}
