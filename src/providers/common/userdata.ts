export class Userdata {
    keys: Exchange[] = [];
    constructor(public username: string,public hash: string, public salt: string) {}
}

export class Exchange {
    public static readonly BITSTAMP = "bitstamp";
    public static readonly BITFINEX = "bitfinex";
    constructor(public name: string, public token: string) {}
}