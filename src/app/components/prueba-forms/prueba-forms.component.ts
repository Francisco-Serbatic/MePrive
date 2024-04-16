import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-prueba-forms',
  templateUrl: './prueba-forms.component.html',
  styleUrls: ['./prueba-forms.component.scss']
})
export class PruebaFormsComponent implements OnInit {
  myForm!: FormGroup;
  @ViewChildren('inputs') inputs!: QueryList<ElementRef>;

  constructor() { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      groupArray: new FormArray([])
    });
  }

  get groupArrayControls() {
    return (this.myForm.get('groupArray') as FormArray).controls;
  }

  addGroup() {
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

  removeGroup(index: number) {
    (this.myForm.get('groupArray') as FormArray).removeAt(index);
  }
}
