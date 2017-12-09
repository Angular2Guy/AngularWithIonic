import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Userdata, Exchange } from '../../providers/common/userdata';
import * as CryptoJS from 'crypto-js';
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  
  bitstampKey: string = null;
  bitfinexKey: string = null;
  password: string = null;
    
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');    
    let ud:Userdata = <Userdata> JSON.parse(localStorage.getItem(this.navParams.data.username));    
    let keys = ud.keys.filter(exch => exch.name === Exchange.BITSTAMP).map(exch => exch.token);
    this.bitstampKey = keys.length > 0 ? keys[0] : null;
    keys = ud.keys.filter(exch => exch.name === Exchange.BITFINEX).map(exch => exch.token);
    this.bitfinexKey = keys.length > 0 ? keys[0] : null;    
  }
  
  onSubmit() {
    let ud:Userdata = <Userdata> JSON.parse(localStorage.getItem(this.navParams.data.username));    
    let bfkey = CryptoJS.AES.encrypt(this.bitfinexKey, this.password+ud.salt.slice(0, 20)).toString();
    let bskey = CryptoJS.AES.encrypt(this.bitstampKey, this.password+ud.salt.slice(0, 20)).toString();       
    ud.keys = [];
    ud.keys.push(new Exchange(Exchange.BITFINEX, bfkey));
    ud.keys.push(new Exchange(Exchange.BITSTAMP, bskey));    
    localStorage.setItem(this.navParams.data.username, JSON.stringify(ud));
    
  }
}
