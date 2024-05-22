import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Dish, createEmptyDish } from 'src/app/models/dish';
import { DateManagerService } from 'src/app/services/date-manager.service';
import { DishAPIService } from 'src/app/services/dish-api.service';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss']
})
export class OrdersFormComponent implements OnInit {

  @ViewChildren('inputs') inputs!: QueryList<ElementRef>;

  editing = false
  inputValue: string = '';
  activeTab = 0;

  popUpShow!: boolean;
  inputToDelete: number = -1;

  myForm!: FormGroup;

  constructor(private apiConection: DishAPIService, private formBuilder: FormBuilder, private dateManager: DateManagerService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      groupArray: new FormArray([])
    });
 
    
  }

  get groupArrayControls() {
    return (this.myForm.get('groupArray') as FormArray).controls;
  }

  onDeleteConfirmed(confirmed: boolean) {
    if (confirmed) {
      (this.myForm.get('groupArray') as FormArray).removeAt(this.inputToDelete);
    } 
  
    this.popUpShow = false; // Ocultar el popup después de recibir la confirmación
  }
  
  addMeal() {
    this.editing = true;
    const newGroup = new FormGroup({
      label: new FormControl('')
    });
    (this.myForm.get('groupArray') as FormArray).push(newGroup);

    setTimeout(() => {
      this.focusOnInput(this.inputs.length-1)
    }, 15);
   
  }

  focusOnInput(index: number) {
    this.inputs.toArray()[index].nativeElement.focus();
  }

  onBlurInput(index: number) {
    const input = (this.myForm.get('groupArray') as FormArray).at(index);
    var dishData: Dish = createEmptyDish();
    dishData.name = input.value.label;

  }

  removeMeal(index: number) {
    this.inputToDelete = index;
    this.popUpShow = true;
    // (this.myForm.get('groupArray') as FormArray).removeAt(index);
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
}

