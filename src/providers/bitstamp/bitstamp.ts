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
import { CancelOrderBs } from '../common/cancelorderBs';
import * as CryptoJS from 'crypto-js';
 
@Injectable()
export class BitstampProvider {    
        
    private _reqOptionsArgs = { headers: new HttpHeaders().set( 'Content-Type', 'application/json' ) };
    //proxy urls
    private readonly _bitstamp = '/bitstamp';
    private readonly _bitstamp2 = '/bitstamp2';
    //app urls
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
    
    private buildCommonBody(customerId: string, key: string, secret: string): string {
        const nonce = Date.now().toString();
        const payload = nonce + customerId + key;           
        const signature = CryptoJS.HmacSHA256(payload, secret).toString(CryptoJS.enc.Hex).toUpperCase();
        let body = 'key=' + key+ '&signature='+ signature+ '&nonce='+ nonce;
        return body;
    }
    
    private buildCommonOptions(): any {
        let reqOptionsArgs = { headers: new HttpHeaders()
            .set( "content-type", "application/x-www-form-urlencoded")
            .set("accept", "application/json" )};
        return reqOptionsArgs;
    }
    
    getOpenOrders(customerId: string, key: string, secret: string): Observable<OpenOrderBs[]> {
        let reqOptionsArgs = this.buildCommonOptions();
        let body = this.buildCommonBody(customerId, key, secret);
        return this.http.post(this._bitstamp2+'/api/v2/open_orders/all/', body, reqOptionsArgs).catch(this._utils.handleError);
    }
    
    postOrder(customerId: string, key: string, secret: string, pair: string, amount: number, price: number, limit: number, buysell: number): Observable<OrderBs> {
        let reqOptionsArgs = this.buildCommonOptions();
        let body = this.buildCommonBody(customerId, key, secret);
        body = body + '&amount=' + amount + '&price=' + price + '&limit_price=' + limit;
//        console.log(body);
        let url = this._bitstamp2+'/api/v2/'+(buysell === 1 ? 'buy' : 'sell')+'/'+pair+'/';        
        return this.http.post(url, body, reqOptionsArgs).catch(this._utils.handleError);
    }
    
    cancelOrder(customerId: string, key: string, secret: string, orderId: number): Observable<CancelOrderBs> {
        let reqOptionsArgs = this.buildCommonOptions();
        let body = this.buildCommonBody(customerId, key, secret);
        body = body + '&id=' + orderId;
        let url = this._bitstamp2 + '/api/v2/cancel_order/';
        return this.http.post(url, body,reqOptionsArgs).catch(this._utils.handleError);
    }
}