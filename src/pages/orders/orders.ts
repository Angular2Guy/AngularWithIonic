import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BitstampProvider } from '../../providers/bitstamp/bitstamp';
import { BitfinexProvider } from '../../providers/bitfinex/bitfinex';
import * as CryptoJS from 'crypto-js';
import { Userdata, Exchange } from '../../providers/common/userdata';
import { Observable } from 'rxjs/Observable';
import { OpenOrderBs } from '../../providers/common/openorderBs';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  password: string;
  wrongPW = false;
  openOrdersBs: Observable<OpenOrderBs>;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, private bitstampServ: BitstampProvider, private bitfinexServ: BitfinexProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
//    this.bitstampServ.getOpenOrders(customerId, key, secret)
  }

  getOrders() {
      this.wrongPW = false;
      let ud: Userdata = <Userdata>JSON.parse( localStorage.getItem( this.navParams.data.username ) );
      let hash = ud !== null ? CryptoJS.PBKDF2( this.password, ud.salt, { keySize: 256 / 32, iterations: 1200 } ).toString() : null;
      if ( ud === null || !( hash === ud.hash ) ) {
          console.log( "Wrong password." );
          this.wrongPW = true;
          return;
      }
      let myKey = ud.keys.filter( exch => exch.name === Exchange.BITSTAMP )[0];
      let mySecret = CryptoJS.AES.decrypt( myKey.token, this.password ).toString( CryptoJS.enc.Utf8 );
      let myId = CryptoJS.AES.decrypt( myKey.id, this.password ).toString( CryptoJS.enc.Utf8 );
      this.openOrdersBs =  this.bitstampServ.getOpenOrders(myKey.userid, myId, mySecret);      
  }
}
