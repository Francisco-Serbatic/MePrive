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
    const url = `${this.dishUrl}/${dateString}`;
    return this.http.get<Dish | null>(url);
  }

  getDishById(id: string): Observable<Menu | null> {
    const url = `${this.dishUrl}/${id}`;
    return this.http.get<Menu | null>(url);
  }

  getTodayMenu() {
    const url = `${this.menuUrl}/today`;
    return this.http.get(url);
  }

  /**
   * 
   * @returns Hace 7 consultas y te las va devolviendo por orden
   */
  getWeekMenus(): Observable<Menu> {
    const week: Date[] = this.dateManger.getNextWeek();
    const observables = week.map(day => this.getMenuByDate(day));
    return concat(...observables);
  }

  getMenuByDate(date: Date): Observable<any> {
    const dateString: string = this.dateManger.formatDate(date);
    const url: string = `${this.menuUrl}/${dateString}`;
    return this.http.get(url);
  }
}
