import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  
  constructor(public http:HttpClient) { }

  weatherData(lat, lon){
    let url = `https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=439d4b804bc8187953eb36d2a8c26a02&units=metric`;
    return this.http.get(url);
  }
}
