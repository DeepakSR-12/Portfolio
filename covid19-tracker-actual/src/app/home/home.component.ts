import { Router } from '@angular/router';
import { CovidDataService } from './../services/covid-data.service';
import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { IDropdownSettings } from 'ng-multiselect-dropdown';
// import * as $ from 'jquery';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  jsonData;
  actualData;
  totalRecovered;
  totalConfirmed;
  totalDeaths;
  activeCases;
  deltaConfirmed;
  deltaActive;
  deltaRecovered;
  deltaDeaths;
  date;
  shown = false;


  

 
  constructor(private dataService : CovidDataService, private router: Router) { }

  ngOnInit() {

    this.dataService.getData().subscribe(data => {
      this.jsonData = data,
      this.shown = true;
      this.getData();
    });
  }

  


  getData() {


    console.log('hello');
    
    console.log(this.jsonData.statewise);
    console.log(this.jsonData);
    
    console.log(this.jsonData.statewise[0]);
    this.actualData = this.jsonData.statewise[0];

    this.activeCases = Number(this.actualData.active);
    this.totalRecovered = Number(this.actualData.recovered);
    this.totalDeaths = Number(this.actualData.deaths);
    this.totalConfirmed = Number(this.actualData.confirmed);

    this.deltaConfirmed = Number(this.actualData.deltaconfirmed);
    this.deltaRecovered = Number(this.actualData.deltarecovered);
    this.deltaDeaths = Number(this.actualData.deltadeaths);
    this.deltaActive = this.deltaConfirmed - this.deltaRecovered - this.deltaDeaths;

    this.date = this.actualData.lastupdatedtime.split(' ')[0];
    
    console.log(((this.activeCases) / (this.totalConfirmed)*100).toFixed(0));
    
    this.pieChart();

  }


  pieChart(){
    

    am4core.useTheme(am4themes_animated);
    
    let chart = am4core.create("pieChart", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0;
    

    chart.data = [
      {
        category: "Active",        
        percentage: this.activeCases ,
        color: am4core.color("#E9D66B"),
        labelColor : am4core.color("#E9D66B")
      },
      {
        category: "Recovered",        
        percentage: this.totalRecovered,
        color: am4core.color("#A4C639"),
        labelColor : am4core.color("#A4C639")
      },
      {
        category: "Deaths",      
        percentage: this.totalDeaths,
        color: am4core.color("#7C0A02"),
        labelColor : am4core.color("#7C0A02")
      }
    ];

      chart.innerRadius = 60;
      let series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "percentage";
      series.dataFields.category = "category";
      series.slices.template.propertyFields.fill = "color";    
      series.labels.template.propertyFields.fill = "labelColor";


  }

  

  stateData(){
    console.log(this.jsonData);
    
    // this.router.navigate(['/states', {queryParams: {jsonData : this.jsonData  }, skipLocationChange: false} ]);
    this.router.navigateByUrl('/states');
  }

}
