import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Dish } from 'src/app/models/dish';
import { Menu } from 'src/app/models/menu';
import { DateManagerService } from 'src/app/services/date-manager.service';
import { DishAPIService } from 'src/app/services/dish-api.service';

@Component({
  selector: 'app-admin-menu-tabs',
  templateUrl: './admin-menu-tabs.component.html',
  styleUrls: ['./admin-menu-tabs.component.scss']
})
export class AdminMenuTabsComponent implements OnInit {
  apiDataReceived: boolean = false;
  apiError: boolean = false;
  inputValue: string = '';
  week: Date[];
  tabs: string[] = [];
  menus: Menu[] = []
  activeTab = 0;

  inputToDelete: number = -1;

  myForm!: FormGroup;

  @ViewChild('firstTab', { static: true }) firstTab!: ElementRef;
  @ViewChildren('inputs') inputs!: QueryList<ElementRef>;

  constructor(private apiConection: DishAPIService, private formBuilder: FormBuilder, private dateManager: DateManagerService) {
    this.week = dateManager.getNextWeek();

    this.setDefaultInputs()

    for (let i = 0; i < 5; i++) {
      this.tabs.push(dateManager.getDayOfWeek(this.week[i]));
    }
  }

  ngOnInit(): void {
    //this.getMeals();
    this.myForm = new FormGroup({
      groupArray: new FormArray([])
    });
  }


  get groupArrayControls() {
    return (this.myForm.get('groupArray') as FormArray).controls;
  }

  getDefaultMeals(date: Date): Dish[] {
    for (const menu of this.menus) {
      if (menu.dishes.length > 0) {
        if (menu.dishes[0].date == this.dateManager.formatDate(date)) {
          return menu.dishes;
        }

      }
    }
    return []
  }

  getMenuPrice(date: Date): number {
    for (const menu of this.menus) {
      if (menu.date == this.dateManager.formatDate(date)) {
        return menu.totalPrice;
      }
    }
    return 5.5
  }

  setDefaultInputs() {
    this.apiDataReceived = false;
    this.apiError = false;
    var dates: Date;
    this.apiConection.getWeekMenus().subscribe({
      next: (res) => {
        var dayDishArray: Dish[] = [];
        if (res instanceof Observable) {
          var dateMenuReceibed: Date = dates
          res.subscribe({
            next: (menu) => {
              if (menu != null) {
                this.menus.push(menu)
              } else {
                this.apiConection.postNewMenu(5, dateMenuReceibed).subscribe({
                  next: () => { }
                })
              }
              this.apiDataReceived = true;
              this.apiError = false;
              this.reloadFirstTab()

            },
            error: (e) => {
              this.apiDataReceived = true;
              this.apiError = true
            }
          })
        } else if (res instanceof Date && res != null) {
          dates = res
        }
      },
      error: () => {
        this.apiDataReceived = true;
        this.apiError = true;
      },

    });
  }

  reloadFirstTab(): void {
    const currentTab = this.activeTab;
    this.activeTab = currentTab === 0 ? 1 : 0;

    setTimeout(() => {
      this.activeTab = 0;
    }, 0);
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
    this.inputValue = ''; // Clear the input value
  }

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