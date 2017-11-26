export interface QuoteBs {
    _id: string;
    pair: string;
    createdAt: Date;
    high: number;
    last: number;
    timestamp: Date;
    bid: number;
    vwap: number;
    volume: number;
    low: number;
    ask: number;
    open: number;
}