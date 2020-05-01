import { CovidDataService } from './../services/covid-data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  jsonData;
  actualData;
  totalRecovered;
  totalConfirmed;
  totalDeaths;
  activeCases;
  shown = false;

  constructor(private _dataService : CovidDataService, private router: Router){

  }

  ngOnInit() {
    this._dataService.getData().subscribe(data => this.jsonData = data);
  }

  getData(){
    console.log(this.jsonData.statewise);
    console.log(this.jsonData);
    
    // let eleLast = this.jsonData.length;
    console.log(this.jsonData.statewise[0]);
    this.actualData = this.jsonData.statewise[0];

    this.activeCases = this.actualData.active;
    this.totalRecovered = this.actualData.recovered;
    this.totalDeaths = this.actualData.deaths;
    this.totalConfirmed = this.actualData.confirmed;
    this.shown = true;
  }

  stateData(){
    console.log(this.jsonData);
    
    this.router.navigate(['/states', {queryParams: {jsonData : this.jsonData  }, skipLocationChange: false} ]);
  }

}
