import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MetadataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MetadataProvider {
  
  password: string;  
    
  constructor(public http: Http) {
    console.log('Hello MetadataProvider Provider');
  }

}
