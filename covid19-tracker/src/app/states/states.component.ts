import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CovidDataService } from './../services/covid-data.service';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {
  data;
  sub;
  statesArray = [];
  selectedItem = '';
  shown = false;
  shownChart = false;
  selectedIndex : number;

  actualData: any; 
  totalRecovered;
  totalConfirmed;
  totalDeaths;
  activeCases;
  

  

  

  constructor(private _dataService: CovidDataService) { }

  ngOnInit() {
    this._dataService.getData().subscribe(data => this.data = data);
  }

  getDataFunc(){

    let dummyArray = [];
    this.shown = true;
    this.data.statewise.forEach(element => {
      dummyArray.push(element.state)
    });
    this.statesArray = dummyArray.slice(1);
    console.log(this.statesArray);
    
  }

  dropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'item_id',
    textField: 'item_text',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
    noDataAvailablePlaceholderText: 'no data found'
  };
  

  onItemSelect(item: any) {
    this.shownChart = true
    // console.log(item);
    this.selectedItem = String(item)
    console.log(this.selectedItem);
    
    this.selectedIndex = this.statesArray.indexOf(this.selectedItem) + 1;
    console.log(this.selectedIndex);
    
    this.actualData = this.data.statewise[this.selectedIndex]

    this.activeCases = this.actualData.active;
    this.totalRecovered = this.actualData.recovered;
    this.totalDeaths = this.actualData.deaths;
    this.totalConfirmed = this.actualData.confirmed;

    console.log(typeof this.actualData);

  }


  onItemDeSelect() {
    this.shownChart = false;
    this.selectedItem = '';
    this.actualData = {};
  }
  
  

}
