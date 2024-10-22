import { FilterKeyType } from "../types/filter-key-type.type";
import { OrderType } from "../types/order-type.type";

export interface SortCriteria {
    key: FilterKeyType,
    order: OrderType
}