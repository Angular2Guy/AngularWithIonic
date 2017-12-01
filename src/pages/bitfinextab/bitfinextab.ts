import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BitfinextabPage');
    if(typeof this.navParams.get('buysell') === 'undefined' || this.navParams.get('buysell') === null) {
        this.navParams.data.buysell = 1; 
    } 
    if(typeof this.navParams.get('amount') === 'undefined' || this.navParams.get('amount') === null) {
        this.navParams.data.amount = 0;
    }
  }

  onSubmit() {
      
  }
  
}

