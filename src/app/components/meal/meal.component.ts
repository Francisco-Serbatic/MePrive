import { Component, Input, OnInit } from '@angular/core';
import { GetImageService } from 'src/app/services/get-image.service';
import { JsonConectionService } from 'src/app/services/json-conection.service';


@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {
  @Input() mealName: string | undefined;
  mealType: string = "";

  constructor (private iamgesUrlService: GetImageService, private jsonService: JsonConectionService) { }

  ngOnInit(): void {
  }

}
