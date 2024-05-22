import { makeBindingParser } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { MealTypeGrouper } from 'src/app/models/meal-type-grouper';
import { EdamamAPIConectionService } from 'src/app/services/edamam-apiconection.service';
import { GetImageService } from 'src/app/services/get-image.service';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  @Input({ required: true }) mealName!: string;
  @Input({ required: true }) mealPrice!: number;
  // 10 images: bowl, egg, fish, glass, iceCream, pipe, pizza, plate, salad, sandwich
  mealImageName: string = "./../../../assets/svgs/plate.svg";
  mealImageMealTypeRelation: MealTypeGrouper = {
    bowl: ['condiments and sauces', 'soup'],
    egg: ['egg'],
    fish: ['seafood'],
    glass: ['alcohol cocktail', 'drinks'],
    iceCream: ['ice cream and custard'],
    pipe: ['biscuits and cookies', 'bread', 'cereals', 'desserts', 'pancake', 'pastry', 'pies and tarts'],
    pizza: ['pizza'],
    plate: ['main course', 'pasta', 'side dish', 'special occasions', 'starter', 'sweets', 'preps', 'preserve'],
    salad: ['salad'],
    sandwich: ['sandwiches'],
  }
  allergiesHealthLabels: string[] = ['Crustacean-Free', 'Dairy-Free', 'Gluten-Free'];
  allergiesFounded: string[] = [];
  tipesOfDiet: string[] = ['Pescatarian', 'Vegetarian', 'Vegan'] // Important order of quisquilloso


  constructor(private imageUrlService: GetImageService, private edamamService: EdamamAPIConectionService) { }

  ngOnInit(): void {
    this.searchReceipesByName(this.mealName);
  }

  searchReceipesByName(mealName: string): void {
    this.edamamService.searchRecipesByName(mealName)
      .subscribe({
        next: (mealTypes) => {
          if (mealTypes.hits.length == 0) {
            console.log("Te has inventado la receta colega")
          }
          else {
            console.log(mealTypes)
            this.setMealImageName(mealTypes.hits[1].recipe.dishType.toString());
            let healthLabels = mealTypes.hits[1].recipe.healthLabels;
            this.allergiesFounded = this.allergenFreeFinder(healthLabels);
            this.tipesOfDiet[0] = this.typeOfDietFinder(healthLabels);
            console.log(this.tipesOfDiet[0]);
          }
        },
        error: (error) => console.error('Error:', error)
      });
  }

  allergenFreeFinder(healthLabels: string[]): string[] {
    let allergiesFounded: string[] = []
    this.allergiesHealthLabels.forEach((allergy) => {
      if (!healthLabels.includes(allergy)) {
        allergiesFounded.push(allergy.split('-')[0]);
      }
    })
    return allergiesFounded;
  }

  typeOfDietFinder(healthLabels: string[]): string {
    let foundType: string = '';
    for (let i = 0; i < this.tipesOfDiet.length - 1; i++) {
      this.tipesOfDiet.forEach((type) => {
        if (healthLabels.includes(type)) {
          foundType = type;
        }
      })
    }
    return foundType;
  }

  setMealImageName(name: string) {
    this.mealImageName = name.split(',')[name.split(',').length - 1];
    Object.keys(this.mealImageMealTypeRelation).forEach(key => {
      let values = this.mealImageMealTypeRelation[key];

      values.forEach(value => {
        if (value.includes(this.mealImageName)) {
          this.mealImageName = key + '.svg';
          this.mealImageName = this.imageUrlService.getSvgUrl(this.mealImageName);
        }
      });
    });
  }

  getSvgImage(name: string): string {
    return this.imageUrlService.getSvgUrl(name + '.svg')
  }
}
