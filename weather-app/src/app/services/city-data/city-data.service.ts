import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CityDataService {

  url = 'assets/city-data/city.list.json';
  constructor(private http: HttpClient) { }

  getCityData(){
    return this.http.get(this.url);
  }
}
