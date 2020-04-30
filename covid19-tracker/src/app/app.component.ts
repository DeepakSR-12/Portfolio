import { CovidDataService } from './services/covid-data.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covid19-tracker';
  jsonData;
  actualData;
  totalRecovered;
  totalConfirmed;
  totalDeaths;
  activeCases;
  shown = false;

  constructor(private _dataService : CovidDataService){

  }

  ngOnInit() {
    this._dataService.getData().subscribe(data => this.jsonData = data);
  }

  getData(){
    let eleLast = this.jsonData.length;
    console.log(this.jsonData[eleLast-1]);
    this.actualData = this.jsonData[eleLast-1];

    this.activeCases = this.actualData[1];
    this.totalRecovered = this.actualData[2];
    this.totalDeaths = this.actualData[3];
    this.totalConfirmed = this.activeCases + this.totalRecovered + this.totalDeaths;
    this.shown = true;
  }

}
