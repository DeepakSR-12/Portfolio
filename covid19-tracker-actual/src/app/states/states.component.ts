import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CovidDataService } from './../services/covid-data.service';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


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
  shownChart = false;
  selectedIndex : number;

  actualData: any; 
  totalRecovered;
  totalConfirmed;
  totalDeaths;
  activeCases;
  

  

  

  constructor(private _dataService: CovidDataService) { }

  ngOnInit() {
    this._dataService.getData().subscribe(data => {
      this.data = data,
      this.getDataFunc();
      
    });
  }

  getDataFunc(){

    let dummyArray = [];    
    this.data.statewise.forEach(element => {
      dummyArray.push(element.state)
    });
    this.statesArray = dummyArray.slice(1);
    console.log(this.statesArray);
    
    
    
  }

  pieChart(){
    

    am4core.useTheme(am4themes_animated);
    
    let chart = am4core.create("pieChart", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0;
    

    chart.data = [
      {
        category: "Active",        
        percentage: this.activeCases ,
        // percentage: 50 ,        
        color: am4core.color("#E9D66B")
      },
      {
        category: "Recovered",        
        // percentage: 30 ,
        percentage: this.totalRecovered,
        color: am4core.color("#A4C639")
      },
      {
        category: "Deaths",      
        // percentage: 20 ,
        percentage: this.totalDeaths,
        color: am4core.color("#7C0A02")
      }
    ];

      chart.innerRadius = 60;
      let series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "percentage";
      series.dataFields.category = "category";
      series.slices.template.propertyFields.fill = "color";        

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
    this.shownChart = true;
    
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
    this.pieChart();
  }


  onItemDeSelect() {
    this.shownChart = false;
    this.selectedItem = '';
    this.actualData = {};
  }

  
}