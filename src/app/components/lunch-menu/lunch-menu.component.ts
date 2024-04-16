import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { JsonConectionService } from 'src/app/services/json-conection.service';


@Component({
  selector: 'app-lunch-menu',
  templateUrl: './lunch-menu.component.html',
  styleUrls: ['./lunch-menu.component.scss']
})
export class LunchMenuComponent implements OnInit {
  editing = false
  inputValue: string = '';
  tabs = [
    {
      title: 'Tab 1',
      content: ["mealExample", "test"]
    },
    {
      title: 'Tab 2',
      content: ["asdasdsda", "asddas"]
    },
    {
      title: 'Tab 3',
      content: []
    },
    {
      title: 'Tab 4',
      content: []
    }
  ]; 
  activeTab = 0;

  myForm!: FormGroup;
  @ViewChildren('inputs') inputs!: QueryList<ElementRef>;

  constructor(private jsonService: JsonConectionService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //this.getMeals();
    this.myForm = new FormGroup({
      groupArray: new FormArray([])
    });

    const meals: string[] = ["mealExample", "test"];
    this.setFormArrayValues(this.tabs[0].content);
  }

  get groupArrayControls() {
    return (this.myForm.get('groupArray') as FormArray).controls;
  } 

  handleEnterKey() {
    this.addMeal();
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
  
  addMeal() {
    //this.inputs.push(this.formBuilder.control(''));
    this.editing = true;
    const newGroup = new FormGroup({
      label: new FormControl('')
    });
    (this.myForm.get('groupArray') as FormArray).push(newGroup);

    // Hacemos focus en el nuevo input después de un breve retraso
    setTimeout(() => {
      this.focusOnInput(this.inputs.length-1)
    }, 100);
   
  }
  focusOnInput(index: number) {
    this.inputs.toArray()[index].nativeElement.focus();
  }

  removeMeal(index: number) {
    (this.myForm.get('groupArray') as FormArray).removeAt(index);
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
      this.setFormArrayValues(this.tabs[index].content);
  
    }
  }
  
  resizeInput(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    input.style.width = (input.value.length + 1) + 'ch'; // Adjust width based on input length
  }
}