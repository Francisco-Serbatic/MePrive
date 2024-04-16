import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EdamamAPIConectionService {

  private accessUrl: string = "https://api.edamam.com/api/recipes/v2";
  private apiKey: string = 'd5eb9d6424f5a9b770adc3839d919a94';
  private appId: string = '749ed51d';
  private type: string = 'public';

  constructor(private http: HttpClient) { }

  searchRecipesByName(recipeName: string): Observable<any> {
    const url = `${this.accessUrl}?type=${this.type}&q=${recipeName}&app_id=${this.appId}&app_key=${this.apiKey}`;
    return this.http.get(url);
  }
}
