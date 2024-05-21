import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Dish } from 'src/app/models/dish';
import { Menu } from 'src/app/models/menu';
import { DateManagerService } from 'src/app/services/date-manager.service';
import { DishAPIService } from 'src/app/services/dish-api.service';


@Component({
  selector: 'app-lunch-menu',
  templateUrl: './lunch-menu.component.html',
  styleUrls: ['./lunch-menu.component.scss']
})
export class LunchMenuComponent implements OnInit {
  meals!: Dish[];
  editing = false
  inputValue: string = '';
  tabs: string[] = [];
  defaultValues: string[][] = []
  activeTab = 0;

  confirmingDelete!: boolean;
  inputToDelete: number = -1;

  myForm!: FormGroup;
  @ViewChildren('inputs') inputs!: QueryList<ElementRef>;

  constructor(private apiConection: DishAPIService, private formBuilder: FormBuilder, private dateManager: DateManagerService) {
    const week: Date[] = dateManager.getNextWeek();

    this.setDefaultInputs()

    for (let i = 0; i < 1; i++) {
      this.tabs.push(dateManager.getDayOfWeek(week[i]));

      apiConection.getDishesByDate(week[i]).subscribe({
        next: (meals) => {
          var dishesOnMenu: string[] = [];
          // if (meals != null) {
          //   const menu: Menu = meals;
          //   menu.dishes.forEach((dish) => {
          //     dishesOnMenu.push(dish.name);
          //   })
          // }
          console.log(meals)
          //this.defaultValues.push(dishesOnMenu);
        },
        //error: (error) => console.error('Error:', error)
      });

    }
  }

  ngOnInit(): void {
    //this.getMeals();
    this.myForm = new FormGroup({
      groupArray: new FormArray([])
    });

    // this.apiConection.searchAllDishes()
    //   .subscribe({
    //     next: (meals) => {
    //       this.meals = meals;
    //     },
    //     error: (error) => console.error('Error:', error)
    //   }
    //   );

    //const meals: string[] = ["mealExample", "test"];
    //this.setFormArrayValues(this.tabs[0].content);
  }

  get groupArrayControls() {
    return (this.myForm.get('groupArray') as FormArray).controls;
  }

  setDefaultInputs() {
    this.apiConection.getWeekMenus().subscribe((data: Menu) => {
      console.log('Resultado de la solicitud:', data);
      const cosita: string[] = [];
      if (data != null)
        {
          data.dishes.forEach((element) => {
            cosita.push(element.name)
          });
        }
      this.defaultValues.push(cosita);
    });
  }

  setFormArrayValues(values: string[]) {
    const formArray = this.myForm.get('groupArray') as FormArray;
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
    values.forEach(value => {
      const newGroup = new FormGroup({
        label: new FormControl(value)
      });
      (this.myForm.get('groupArray') as FormArray).push(newGroup);

    });
  }

  saveAndExit() {
    if (this.inputValue.trim() !== '') {
      // Save the input value or perform any desired action
      console.log('Input value:', this.inputValue);
      (this.myForm.get('groupArray') as FormArray).push(this.formBuilder.control(this.inputValue));
    } else {
    }
    this.editing = false;
    this.inputValue = ''; // Clear the input value
  }

  /* getMeals(): void {
    this.jsonService.getMeals()
      .subscribe({
        next: (meals) => {
          this.meals = meals;
          console.log(meals)
        },
        error: (error) => console.error('Error:', error)
      }
      
      );
  } */

  scrollTabs(direction: number) {
    this.activeTab += direction;
    if (this.activeTab < 0) {
      this.activeTab = 0;
    } else if (this.activeTab >= this.tabs.length) {
      this.activeTab = this.tabs.length - 1;
    }
  }

  changeTab(index: number) {
    if (index >= 0 && index < this.tabs.length) {
      this.activeTab = index;
      //this.setFormArrayValues(this.tabs[index].content);

    }
  }

  resizeInput(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    input.style.width = (input.value.length + 1) + 'ch'; // Adjust width based on input length
  }
}