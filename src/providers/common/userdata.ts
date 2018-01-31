export class Userdata {
    keys: Exchange[] = [];
    constructor(public username: string,public hash: string, public salt: string) {
        this.keys.push(new Exchange(Exchange.BITFINEX, null, null, null));
        this.keys.push(new Exchange(Exchange.BITSTAMP, null, null, null));
    }
}

export class Exchange {
    public static readonly BITSTAMP = "bitstamp";
    public static readonly BITFINEX = "bitfinex";
    constructor(public name: string, public id: string, public token: string, public userid: string) {}
}