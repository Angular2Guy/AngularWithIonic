export interface OrderbookBf {
    bids: OrderObBf[];
    asks: OrderObBf[];
}

export interface OrderObBf {
    price: string;
    amount: string;
    timestamp: Date;
}