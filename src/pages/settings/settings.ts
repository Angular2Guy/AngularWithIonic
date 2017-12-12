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

  bitstampId: string = null;
  bitstampKey: string = null;
  bitfinexId: string = null;
  bitfinexKey: string = null;
  password: string = null;
  wrongPW = false;
    
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');    
    let ud:Userdata = <Userdata> JSON.parse(localStorage.getItem(this.navParams.data.username));    
    let keys = ud.keys.filter(exch => exch.name === Exchange.BITSTAMP).map(exch => exch.token);
    this.bitstampKey = keys.length > 0 ? "X" : null;    
    keys = ud.keys.filter(exch => exch.name === Exchange.BITSTAMP).map(exch => exch.id);
    this.bitstampId = keys.length > 0 ? "X" : null;
    keys = ud.keys.filter(exch => exch.name === Exchange.BITFINEX).map(exch => exch.token);
    this.bitfinexKey = keys.length > 0 ? "X" : null;
    keys = ud.keys.filter(exch => exch.name === Exchange.BITFINEX).map(exch => exch.id);
    this.bitfinexId = keys.length > 0 ? "X" : null;
  }     
  
  onSubmit() {
    this.wrongPW = false;
    let ud:Userdata = <Userdata> JSON.parse(localStorage.getItem(this.navParams.data.username));
    let hash = ud !== null ? CryptoJS.PBKDF2(this.password ,ud.salt,{ keySize: 256/32, iterations: 1200 }).toString() : null;
    if(ud === null || !(hash === ud.hash)) {
        console.log("Wrong password.");
        this.wrongPW = true;
        return;
    }
    let bfid = CryptoJS.AES.encrypt(this.bitfinexId, this.password).toString();
    let bfkey = CryptoJS.AES.encrypt(this.bitfinexKey, this.password).toString();
    let bsid = CryptoJS.AES.encrypt(this.bitstampId, this.password).toString();
    let bskey = CryptoJS.AES.encrypt(this.bitstampKey, this.password).toString();       
    for(let i = 0;i<ud.keys.length;i++) {
        if(ud.keys[i].name === Exchange.BITFINEX && this.bitfinexId !== "X" && this.bitfinexKey !== "X") {
           ud.keys[i] = new Exchange(Exchange.BITFINEX, bfid, bfkey);
        } else if(ud.keys[i].name === Exchange.BITSTAMP && this.bitstampId !== "X" && this.bitstampKey !== "X") {
            ud.keys[i] = new Exchange(Exchange.BITSTAMP, bsid, bskey);
        }
    }        
    localStorage.setItem(this.navParams.data.username, JSON.stringify(ud));
    console.log("Settings saved.");
//    console.log(CryptoJS.AES.decrypt(bsid, this.password).toString(CryptoJS.enc.Utf8));
  }
}
