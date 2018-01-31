export interface OpenOrderBs {
    id: string;
    datetime: Date;
    type: number;
    price: number;
    currency_pair: string;
    status: string;
    reason: string;
}