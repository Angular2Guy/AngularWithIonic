import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as CryptoJS from 'crypto-js';
import { Userdata } from '../../providers/common/userdata';
import { License } from './license';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  signinForm: FormGroup;  
  pwMatching = true;
  signinFailed= false;
  

  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
      this.signinForm = this.fb.group({username: ['', Validators.required],
                      password1: ['', Validators.required],
                      password2: ['', Validators.required],
                      licence: [License.text, Validators.required],
                      accept: ['false', Validators.requiredTrue]},{
                          validator: this.validate.bind(this)
                      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');  
  }
  
  validate(group: FormGroup) {
      if(group.get('password1').touched || group.get('password2').touched) {
          this.pwMatching = group.get('password1').value === group.get('password2').value && group.get('password1').value !== '';
          if(!this.pwMatching) {
              group.get('password1').setErrors({MatchPassword: true});
              group.get('password2').setErrors({MatchPassword: true});
          } else {
              group.get('password1').setErrors(null);
              group.get('password2').setErrors(null);
          }
      }
      return this.pwMatching;
  }
  
  private createUserdata() : Userdata {
      let ud = new Userdata(this.signinForm.get('username').value, '', '');
      let array = new Uint32Array(32);      
      crypto.getRandomValues(array);
      let salt = btoa(array.toString());
      ud.salt = salt;     
      let hash =  CryptoJS.PBKDF2(this.signinForm.get('password1').value,salt,{ keySize: 256/32, iterations: 1200 }).toString();
      ud.hash = hash;
      return ud;
  }
  
  signin():void {
      let ud = this.createUserdata();
      let item = localStorage.getItem(this.signinForm.get('username').value);      
      if(item !== null) {
          this.signinFailed = true;          
          return;
      } else {
          this.signinFailed = false;
      }
      localStorage.setItem(this.signinForm.get('username').value, JSON.stringify(ud));
      console.log(ud);
      this.navCtrl.pop();
  }
}
