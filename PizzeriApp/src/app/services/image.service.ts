import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  myAppUrl: string;
  myApiUrl: string;
  public message: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Pizzas/nothing';
  }


  public uploadImage(image: File): string {
    const formData = new FormData();

    formData.append('image', image, image.name);

    this.http.post(this.myAppUrl + this.myApiUrl, formData, {observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          this.message = 'Ok.';
        }
      });
      return this.message;

  }
}
