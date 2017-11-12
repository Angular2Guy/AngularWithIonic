import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { QuotesPage } from '../quotes/quotes';
import * as CryptoJS from 'crypto-js';
import { Userdata } from '../../app/common/userdata';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username: string;
  password: string;

  constructor(public navCtrl: NavController) {

  }
  
  login():void {
      let ud:Userdata = <Userdata> JSON.parse(localStorage.getItem(this.username));      
      let hash = CryptoJS.PBKDF2(this.password ,ud !== null ? ud.salt : '',{ keySize: 256/32, iterations: 1200 }).toString();
      if(ud !== null && hash === ud.hash) {
          this.navCtrl.push(QuotesPage);
      } else {
          console.log(hash+"-"+ud.hash);
      }
  }
  
  signin():void {
      this.navCtrl.push(SigninPage);
  }
}
