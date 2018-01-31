import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/throw';
import { QuoteBs } from '../common/quoteBs';
import { Utils } from '../utils';
import { OrderbookBs } from '../common/orderbookBs';
import { OpenOrderBs } from '../common/openorderBs';
import * as CryptoJS from 'crypto-js';
 
@Injectable()
export class BitstampProvider {    
        
    private _reqOptionsArgs = { headers: new HttpHeaders().set( 'Content-Type', 'application/json' ) };
    private readonly _bitstamp = '/bitstamp';
    private readonly _bitstamp2 = '/bitstamp2';
//    private readonly _bitstamp = 'https://svenloesekann.de:8443/bitstamp';
//    private readonly _bitstamp2 = 'https://www.bitstamp.net';
    BTCUSD = 'btcusd';
    ETHUSD = 'ethusd';
    LTCUSD = 'ltcusd';
    XRPUSD = 'xrpusd';
    private _utils = new Utils(); 

    constructor(private http: HttpClient, private pl: PlatformLocation ) { 
    }

    getCurrentQuote(currencypair: string): Observable<QuoteBs> {
        return this.http.get(this._bitstamp+'/'+currencypair+'/current', this._reqOptionsArgs).catch(this._utils.handleError);
    }
     
    getTodayQuotes(currencypair: string): Observable<QuoteBs[]> {
        return this.http.get(this._bitstamp+'/'+currencypair+'/today', this._reqOptionsArgs).catch(this._utils.handleError);
    }
    
    getOrderbook(currencypair: string): Observable<OrderbookBs> {
        return this.http.get(this._bitstamp2+'/api/v2/order_book/'+currencypair+'/', this._reqOptionsArgs).catch(this._utils.handleError);
    }
    
    getOpenOrders(customerId: string, key: string, secret: string): Observable<OpenOrderBs> {
        const nonce = Date.now().toString();
        const payload = nonce + customerId + key;           
        const signature = CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex).toUpperCase();
//        const signature = CryptoJS.HmacSHA256('hallo123', 'teststring').toString(CryptoJS.enc.Hex).toUpperCase();
        let reqOptionsArgs = { headers: new HttpHeaders().set( "content-type", "application/x-www-form-urlencoded").set(
                "accept", "application/json" )};            
        let body = 'key=' + key+ '&signature='+ signature+ '&nonce='+ nonce;
//        let body = "key=eqOReHeb9vU0ymWhetM8A3VTHPlkJil5&signature=B0A15C933A84C3101AB2A3758F2B3A7D673D51B877898189359254397E698FF3&nonce=1517428816789";
        return this.http.post(this._bitstamp2+'/api/v2/open_orders/btcusd/', body, reqOptionsArgs).catch(this._utils.handleError);
    }
}