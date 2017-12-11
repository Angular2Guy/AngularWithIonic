import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BitfinexProvider } from '../../providers/bitfinex/bitfinex';
import { OrderBf } from '../../providers/common/orderbookBf';

/**
 * Generated class for the BitfinextabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bitfinextab',
  templateUrl: 'bitfinextab.html',
})
export class BitfinextabPage {  
  orders: OrderBf[] = [];
  password = "";
    
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: BitfinexProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BitfinextabPage');
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
      this.service.getOrderbook(this.navParams.get('currency')).subscribe(ob => this.orders = this.filterOrders(this.navParams.data.buysell ? ob.asks : ob.bids, this.navParams.data.amount));
  }
  
  sendOrder() {
      console.log("sendOrder");
  }
  
  private filterOrders(orders: OrderBf[], amount: number) : OrderBf[] {
       let myOrders: OrderBf[] = [];
       if(orders.length === 0) return myOrders;
       let sum = 0;
       for(let i = 0;sum <= amount;i++) {
           myOrders.push(orders[i]);
           sum += parseFloat(orders[i].amount);
       }
       return myOrders;
  }
}

