import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  constructor(private _http: HttpClient) { }

  _url = 'https://raw.githubusercontent.com/indiacovid19/indiacovid19/master/indiacovid19.json';

  
  getData(){
    return this._http.get(this._url);
  }
}
