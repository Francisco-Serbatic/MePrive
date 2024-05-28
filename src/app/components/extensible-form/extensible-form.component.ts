import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Dish, createEmptyDish } from 'src/app/models/dish';
import { Menu } from 'src/app/models/menu';
import { DateManagerService } from 'src/app/services/date-manager.service';
import { DishAPIService } from 'src/app/services/dish-api.service';


@Component({
  selector: 'app-extensible-form',
  templateUrl: './extensible-form.component.html',
  styleUrls: ['./extensible-form.component.scss']
})
export class ExtensibleFormComponent implements OnInit {
  @Input({ required: true }) menuPrice!: number;
  @Input({ required: true }) inputsArray!: Dish[];
  @Input({ required: true }) day!: Date;

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
    if (this.inputsArray != null)
      {
        this.inputsArray.forEach(element => {
          const newGroup = new FormGroup({
            label: new FormControl({value: element.name, disabled: false}),
            price: new FormControl({value: element.price, disabled: false})

          });
          (this.myForm.get('groupArray') as FormArray).push(newGroup);
        });
      }
    
  }

  get groupArrayControls() {
    return (this.myForm.get('groupArray') as FormArray).controls;
  }
  get formArray() : FormArray {
    return this.myForm.get('inputs') as FormArray;
  }

  onDeleteConfirmed(confirmed: boolean) {
    if (confirmed) {
      (this.myForm.get('groupArray') as FormArray).removeAt(this.inputToDelete);
      this.apiConection.deleteDish(this.inputsArray[this.inputToDelete].dishId!).subscribe();
      if (this.inputToDelete < this.inputsArray.length) this.inputsArray.splice(this.inputToDelete, 1)
    } 
  
    this.popUpShow = false; // Ocultar el popup después de recibir la confirmación
  }

  postMeal(dishData: Dish) {
    this.apiConection.postNewDish(dishData).subscribe(
      response => {
        console.log('Respuesta del servidor:', response);
      }
    )
  }
  
  addMeal() {
    this.editing = true;
    const newGroup = new FormGroup({
      label: new FormControl(''),
      price: new FormControl('')

    });
    (this.myForm.get('groupArray') as FormArray).push(newGroup);
    this.inputsArray.push()

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
    
    if (input.value.label != "" && index==(this.myForm.get('groupArray') as FormArray).length-1) {
      dishData.name = input.value.label;
      dishData.date = this.dateManager.formatDate(this.day);
      dishData.price = input.value.price;
      this.inputsArray.push(dishData);
      this.postMeal(dishData);
    } else if (input.value.label != ""){
      dishData.dishId = this.inputsArray[index].dishId
      dishData.name = input.value.label;
      dishData.date = this.dateManager.formatDate(this.day);
      dishData.price = input.value.price;
      this.apiConection.putDish(dishData).subscribe();
    }
  }

  removeMeal(index: number) {
    this.inputToDelete = index;
    this.popUpShow = true;
    // (this.myForm.get('groupArray') as FormArray).removeAt(index);
  }

  updateMenuPrice(value: string){
    if (value != ""){
      var price = parseInt(value)
      this.apiConection.postNewMenu(price, this.day).subscribe()
    }
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
