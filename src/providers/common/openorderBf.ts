export interface OpenOrderBf {
    "id": number,
    "symbol": string,
    "exchange": "bitfinex",
    "price": string,
    "avg_execution_price": string,
    "side": string,
    "type": string,
    "timestamp": Date,
    "is_live": boolean,
    "is_cancelled": boolean,
    "is_hidden": boolean,
    "was_forced": boolean,
    "original_amount": string,
    "remaining_amount": string,
    "executed_amount": string
}