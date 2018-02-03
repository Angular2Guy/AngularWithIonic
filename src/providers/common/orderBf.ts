export interface OrderBf {
    "id": number,
    "symbol": string,
    "exchange": string,
    "price": number,
    "avg_execution_price": number,
    "side": string,
    "type": string,
    "timestamp": Date,
    "is_live": boolean,
    "is_cancelled": boolean,
    "is_hidden": boolean,
    "was_forced": boolean,
    "original_amount": number,
    "remaining_amount": number,
    "executed_amount": number,
    "order_id": number    
}