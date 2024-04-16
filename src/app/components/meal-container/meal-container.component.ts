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
      .subscribe({
        next: (meals) => {
          this.meals = meals;
          
        },
        error: (error) => console.error('Error:', error)
      }
        
      );
  }
}
