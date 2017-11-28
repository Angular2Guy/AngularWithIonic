import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  bitstamptabRoot = 'BitstamptabPage'
  bitfinextabRoot = 'BitfinextabPage'


  constructor(public navCtrl: NavController,public navParams: NavParams) {}

}
