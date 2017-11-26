export interface QuoteBf {
    _id: string;
    pair: string;
    createdAt: Date;
    mid: number;
    bid: number;
    ask: number;
    last_price: number;
    low: number;
    high: number;
    volume: number;
    timestamp: string;
}