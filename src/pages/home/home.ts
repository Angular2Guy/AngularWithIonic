import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { QuotesPage } from '../quotes/quotes';
import * as CryptoJS from 'crypto-js';
import { Userdata } from '../../providers/common/userdata';
import { MetadataProvider } from '../../providers/metadata/metadata';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username: string;
  password: string;
  loginFailed = false;  
  constructor(public navCtrl: NavController, public navParams: NavParams, private metadata: MetadataProvider) {

  }
  
  ionViewDidLoad() {
      //console.log("Home Page");
  }
  
  ionViewDidEnter() {
      console.log("Enter");
      if(typeof this.metadata.password !== "undefined" && this.metadata.password !== null) {
          this.navCtrl.push(QuotesPage, this.navParams);
      }
  }
  
  login():void {
      let ud:Userdata = <Userdata> JSON.parse(localStorage.getItem(this.username));         
      let hash = ud !== null ? CryptoJS.PBKDF2(this.password ,ud.salt,{ keySize: 256/32, iterations: 1200 }).toString() : null;
      if(ud !== null && hash === ud.hash) {
          this.loginFailed = false;
          this.navParams.data.username = this.username;
          this.metadata.password = this.password;
          this.navCtrl.push(QuotesPage, this.navParams);
          this.username = null;
          this.password = null;
      } else {          
          console.log(hash === null ? '' : hash +"-"+ud !== null ? ud.hash : '');
          this.loginFailed = true;
          this.metadata.password = null;
      }
  }
  
  forward():void {
      this.navCtrl.push(QuotesPage, this.navParams);
  }
  
  signin():void {
      this.navCtrl.push(SigninPage);
  }
}
