import { Component, OnInit } from '@angular/core';
import { JsonConectionService } from 'src/app/services/json-conection.service';

@Component({
  selector: 'app-meal-container',
  templateUrl: './meal-container.component.html',
  styleUrls: ['./meal-container.component.scss']
})
export class MealContainerComponent implements OnInit {
  meals!: any[];

  constructor(private jsonService: JsonConectionService) { }

  ngOnInit(): void {
    this.getMeals();
  }

  getMeals(): void {
    this.jsonService.getMeals()
      .subscribe(
        meals => {
          this.meals = meals;
          console.log('Meals:', this.meals);
        },
        error => console.error('Error:', error)
      );
  }

  
  // addMeal(mealName: string)
  // {
  //   this.mealsArray.push(mealName);
  // }
  // removeMeal(mealIndex: number)
  // {
  //   this.mealsArray.splice(mealIndex, 1)
  // }
}
