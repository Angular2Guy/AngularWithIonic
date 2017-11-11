import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Userdata, Exchange } from '../../app/common/userdata';

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

  constructor(private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
      this.signinForm = this.fb.group({username: ['', Validators.required],
                      password1: ['', Validators.required],
                      password2: ['', Validators.required]},{
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
  
  signin():void {
      let ud = new Userdata(this.signinForm.get('username').value, 'hash');
//      ud.keys.push(new Exchange("name","token"));      
      localStorage.setItem(this.signinForm.get('username').value, JSON.stringify(ud));
      this.navCtrl.pop();
  }
}
