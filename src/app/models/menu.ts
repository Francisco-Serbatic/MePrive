import { Dish } from "./dish";

export interface Menu {
    id: number;
    date: string;
    totalPrice: number;
    dishes: Dish[];
}
