export class Userdata {
    keys: Exchange[] = [];
    constructor(public username: string,public hash: string, public salt: string) {}
}

export class Exchange {
    constructor(public name: string, public token: string) {}
}