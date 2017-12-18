import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';


/**
 * Generated class for the OrderbookPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orderbook',
  templateUrl: 'orderbook.html'
})
export class OrderbookPage {

  @ViewChild('exchangeTabs') tabRef: Tabs;
  bitstamptabRoot = 'BitstamptabPage'
  bitfinextabRoot = 'BitfinextabPage'
  private readonly _bitstamptab = 0;
  private readonly _bitfinextab = 1;
  private readonly _bitstampKey = 'bitstamp';
  private readonly _bitfinexKey = 'bitfinex';


  constructor(public navCtrl: NavController,public navParams: NavParams) {}

  ionViewDidLoad() {
      if(this._bitfinexKey === this.navParams.get("exchange")) {
          this.tabRef.select(this._bitfinextab);
      } else if(this._bitstampKey === this.navParams.get("exchange")) {
          this.tabRef.select(this._bitstamptab);
      }
  }
}
