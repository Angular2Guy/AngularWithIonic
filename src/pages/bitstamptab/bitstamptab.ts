import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  
  buysell = 1;
  amount = 0;
    
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BitstamptabPage');    
    if(typeof this.navParams.get('buysell') === 'undefined' || this.navParams.get('buysell') === null) {
        this.navParams.data.buysell = 1; 
    } 
    if(typeof this.navParams.get('amount') === 'undefined' || this.navParams.get('amount') === null) {
        this.navParams.data.amount = 0;
    }
  }
  
  onSubmit() {
      this.navParams.data.buysell = this.buysell;
      this.navParams.data.amount = this.amount;
  }
}
