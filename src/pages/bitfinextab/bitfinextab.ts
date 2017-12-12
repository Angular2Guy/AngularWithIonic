import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BitfinexProvider } from '../../providers/bitfinex/bitfinex';
import { OrderObBf } from '../../providers/common/orderbookBf';
import { OrderBf } from '../../providers/common/orderBf';
import * as CryptoJS from 'crypto-js';
import { Userdata, Exchange } from '../../providers/common/userdata';

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
  orders: OrderObBf[] = [];
  password = "";
  myOrder: OrderBf = null;
    
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
      let ud:Userdata = <Userdata> JSON.parse(localStorage.getItem(this.navParams.data.username));
      let myKey = ud.keys.filter(exch => exch.name === Exchange.BITFINEX)[0];      
      let mySecret = CryptoJS.AES.decrypt(myKey.token, this.password).toString(CryptoJS.enc.Utf8);
      let myId = CryptoJS.AES.decrypt(myKey.id, this.password).toString(CryptoJS.enc.Utf8);      
      this.service.postOrder(myId,mySecret, this.navParams.get('currency'), this.navParams.get('amount'), this.navParams.get('limit'), this.navParams.get('buysell'), 'limit').subscribe(ord => this.myOrder = ord);
  }
  
  private filterOrders(orders: OrderObBf[], amount: number) : OrderObBf[] {
       let myOrders: OrderObBf[] = [];
       if(orders.length === 0) return myOrders;
       let sum = 0;
       for(let i = 0;sum <= amount;i++) {
           myOrders.push(orders[i]);
           sum += parseFloat(orders[i].amount);
       }
       return myOrders;
  }
}

