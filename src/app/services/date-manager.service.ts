import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateManagerService {

  constructor() { }

  /**
   * 
   * @returns Array with 7 days of the  week starting today
   */
  getNextWeek(): Date[] {
    const today = new Date();
    const dates = [today];

    // Obtener las fechas de los próximos 3 días
    for (let i = 1; i <= 7; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);
      dates.push(nextDay);
    }
    return dates;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1); // El mes comienza desde 0
    const day = this.padZero(date.getDate());

    return `${year}-${month}-${day}`;
  }

  private padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  getDayOfWeek(date: Date): string {
    return "date.day"+date.getDay(); // It returns the string of the i18n element
  }

}
