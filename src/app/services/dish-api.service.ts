import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, Observable } from 'rxjs';
import { DateManagerService } from './date-manager.service';
import { Menu } from '../models/menu';
import { Dish } from '../models/dish';

@Injectable({
  providedIn: 'root'
})
export class DishAPIService {
  private dishUrl: string = "http://localhost:9995/api/dish";
  private menuUrl: string = "http://localhost:9995/api/menu";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*' // Esto añade la cabecera CORS
    })
  };

  constructor(private http: HttpClient, private dateManger: DateManagerService) { }

  getAllDishes(): Observable<Dish[]> {
    const url = `${this.dishUrl}/all`;
    return this.http.get<Dish[]>(url, this.httpOptions);
  }

  getDishesByDate(date: Date): Observable<Dish | null> {
    const dateString = this.dateManger.formatDate(date);
    const url = `${this.dishUrl}/date/${dateString}`;
    return this.http.get<Dish | null>(url);
  }

  getDishById(id: string): Observable<Menu | null> {
    const url = `${this.dishUrl}/${id}`;
    return this.http.get<Menu | null>(url);
  }

  getTodayMenu(): Observable<Menu | null> {
    const url = `${this.menuUrl}/today`;
    return this.http.get<Menu | null>(url);
  }

  getMenuByDate(date: Date): [Date, Observable<Menu>] {
    const dateString: string = this.dateManger.formatDate(date);
    const url: string = `${this.menuUrl}/${dateString}`;
    return [date, this.http.get<Menu>(url)];
  }

  /**
   * It does 7 get and returns them by order
   * @returns concat de o
   */
  getWeekMenus(): Observable<Date | Observable<Menu>> {
    const week: Date[] = this.dateManger.getNextWeek();
    const observables = week.map(day => this.getMenuByDate(day));
    return concat(...observables);
  }

  postNewDish(data: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.dishUrl, data)
  }

  postNewMenu(price: number , date: Date ) {
     return this.http.post<Dish>(this.menuUrl, {"price": price, "date": this.dateManger.formatDate(date)})
  }

  deleteDish(id: number) {
    return this.http.delete(this.dishUrl+"/delete/"+id)
  }

}
