export interface Dish {
    id?: number;
    dishId?: number;
    name: string;
    price: number;
    date: string
    type: string;
}

export function createEmptyDish(): Dish {
    return {
        name: "",
        price: 5,
        date: "",
        type: ""
    };
  }