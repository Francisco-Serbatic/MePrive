import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish';
import { Menu } from 'src/app/models/menu';
import { DishAPIService } from 'src/app/services/dish-api.service';

@Component({
  selector: 'app-meal-container',
  templateUrl: './meal-container.component.html',
  styleUrls: ['./meal-container.component.scss']
})
export class MealContainerComponent implements OnInit {
  meals!: Dish[];

  constructor(private apiConection: DishAPIService) { }

  ngOnInit(): void {
    this.setMeals();
  }

  setMeals(): void {
    this.apiConection.getTodayMenu().subscribe({
      next: (meals) => {
        if (meals != null)  this.meals = meals.dishes
        else this.meals = [];
      },
      error: (error) => console.error('Error:', error)
    })
  }

}

