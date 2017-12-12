import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BitstampProvider } from '../../providers/bitstamp/bitstamp';
import { OrderbookBs } from '../../providers/common/orderbookBs';

/**
 * Generated class for the BitstamptabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bitstamptab',
  templateUrl: 'bitstamptab.html',
})
export class BitstamptabPage {    
    
  orders: string[][] = [];
  password = "";  
    
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: BitstampProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BitstamptabPage');    
    if(typeof this.navParams.get('buysell') === 'undefined' || this.navParams.get('buysell') === null) {
        this.navParams.data.buysell = 1; 
    } 
    if(typeof this.navParams.get('amount') === 'undefined' || this.navParams.get('amount') === null) {
        this.navParams.data.amount = 0;
    }
    if(typeof this.navParams.get('limit') === 'undefined' || this.navParams.get('limit') === null) {
        this.navParams.data.limit = 0;
    }    
  }
  
  onSubmit() {      
      this.service.getOrderbook(this.navParams.data.currency).subscribe(ord => this.orders = this.filterOrders(this.navParams.data.buysell ? ord.asks : ord.bids, this.navParams.data.amount));
  }
  
  sendOrder() {
      console.log("sendOrder");
  }
  
  private filterOrders(orders: string[][], amount: number) : string[][] {
      let myOrders: string[][] = [];
      if(orders.length === 0) return myOrders;
      let sum = 0;
      for(let i = 0;sum <= amount;i++) {
          myOrders.push(orders[i]);          
          sum += parseFloat(orders[i][1]);
      }
      return myOrders;
  }
}
