import { DishWithId } from "./dish-with-id";

export interface Menu {
    id: number;
    date: string;
    totalPrice: number;
    dishes: DishWithId[];
}
