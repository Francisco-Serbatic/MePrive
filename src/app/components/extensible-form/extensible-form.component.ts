import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

import { JsonConectionService } from 'src/app/services/json-conection.service';

@Component({
  selector: 'app-extensible-form',
  templateUrl: './extensible-form.component.html',
  styleUrls: ['./extensible-form.component.scss']
})
export class ExtensibleFormComponent implements OnInit {
  @Input({ required: true }) inputsArray!: string[];
  @ViewChildren('inputs') inputs!: QueryList<ElementRef>;

  editing = false
  inputValue: string = '';
  activeTab = 0;

  popUpShow!: boolean;
  inputToDelete: number = -1;

  myForm!: FormGroup;

  constructor(private jsonService: JsonConectionService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //this.getMeals();
    this.myForm = new FormGroup({
      groupArray: new FormArray([])
    });
    if (this.inputsArray != null)
      {
        this.inputsArray.forEach(element => {
          const newGroup = new FormGroup({
            label: new FormControl(element)
          });
          (this.myForm.get('groupArray') as FormArray).push(newGroup);
        });
      }
    
  }

  onDeleteConfirmed(confirmed: boolean) {
    if (confirmed) {
      (this.myForm.get('groupArray') as FormArray).removeAt(this.inputToDelete);
      if (this.inputToDelete < this.inputsArray.length) this.inputsArray.splice(this.inputToDelete, 1)
      console.log(this.inputsArray)
    } else {
      // No realizar la acción de borrado
      console.log('Borrado cancelado');
    }
    this.popUpShow = false; // Ocultar el popup después de recibir la confirmación
  }

  get groupArrayControls() {
    return (this.myForm.get('groupArray') as FormArray).controls;
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
    }, 15);
   
  }

  focusOnInput(index: number) {
    this.inputs.toArray()[index].nativeElement.focus();
  }

  onBlurInput(index: number) {
    const inputValue: string = (this.myForm.get('groupArray') as FormArray).at(index).value.label;
    this.inputsArray[index] = inputValue;
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
