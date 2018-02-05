import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BitstampProvider } from '../../providers/bitstamp/bitstamp';
import { OrderbookBs } from '../../providers/common/orderbookBs';
import { Userdata, Exchange } from "../../providers/common/userdata";
import * as CryptoJS from 'crypto-js';

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
  wrongPW = false;
  missingKeys = false;
    
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
    if(typeof this.navParams.get('price') === 'undefined' || this.navParams.get('price') === null) {
        this.navParams.data.price = 0;
    }
    if(typeof this.navParams.get('limit') === 'undefined' || this.navParams.get('limit') === null) {
        this.navParams.data.limit = 0;
    }    
  }
  
  onSubmit() {      
      this.service.getOrderbook(this.navParams.data.currency).subscribe(ord => this.orders = this.filterOrders(this.navParams.data.buysell ? ord.asks : ord.bids, this.navParams.data.amount));
  }
  
  sendOrder() {
      this.wrongPW = false;
      let ud: Userdata = <Userdata>JSON.parse( localStorage.getItem( this.navParams.data.username ) );
      let hash = ud !== null ? CryptoJS.PBKDF2( this.password, ud.salt, { keySize: 256 / 32, iterations: 1200 } ).toString() : null;
      if ( ud === null || !( hash === ud.hash ) ) {
          console.log( "Wrong password." );
          this.wrongPW = true;
          return;
      }
      let myKey = ud.keys.filter( exch => exch.name === Exchange.BITSTAMP )[0];
      this.missingKeys = false;
      if(!myKey.id || !myKey.token || !myKey.userid) {
          this.missingKeys = true;
          return;
      }
      let mySecret = CryptoJS.AES.decrypt( myKey.token, this.password ).toString( CryptoJS.enc.Utf8 );
      let myId = CryptoJS.AES.decrypt( myKey.id, this.password ).toString( CryptoJS.enc.Utf8 );      
      this.service.postOrder(myKey.userid, myId, mySecret, this.navParams.data.currency, this.navParams.data.amount, this.navParams.data.price, this.navParams.data.limit, this.navParams.data.buysell).subscribe(result => console.log(result));
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
