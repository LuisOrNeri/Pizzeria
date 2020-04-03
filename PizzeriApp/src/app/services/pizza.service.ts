import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Pizza } from '../models/pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Pizzas/';
  }

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getPizza(PizzaId: number): Observable<Pizza> {
    return this.http.get<Pizza>(this.myAppUrl + this.myApiUrl + PizzaId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  savePizza(pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.myAppUrl + this.myApiUrl, JSON.stringify(pizza), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updatePizza(PizzaId: number, pizza): Observable<Pizza> {
    return this.http.put<Pizza>(this.myAppUrl + this.myApiUrl + PizzaId, JSON.stringify(pizza), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  deletePizza(PizzaId: number): Observable<Pizza> {
    return this.http.delete<Pizza>(this.myAppUrl + this.myApiUrl + PizzaId)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
    }

}
