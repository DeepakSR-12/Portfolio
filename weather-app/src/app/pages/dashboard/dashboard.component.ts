import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', './dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  jsonData : any;
  cityData : any;
  data : any;
  
  constructor(private _weatherService : WeatherService) {}
  
  capitals = ['Delhi', 'Chennai', 'Mumbai', 'Kolkata'];
  selectedCity = 'City'
  citiesArray = [];
  temperature = '';
  spinnerShown = false;
  citiesObject = [
    {
      'name': 'Chennai',
      'geo': '13.09' + ' ' + '80.28'      
    },

    {
      'name': 'Mumbai',
      'geo': '19.01' + ' ' + '72.85'      
    },

    {
      'name': 'Kolkata',
      'geo': '22.56' + ' ' + '88.36'
    },

    {
      'name': 'New Delhi',
      'geo': '28.67' + ' ' + '77.22'
    }
];

  ngOnInit() { 
    console.log(this.citiesObject.length);
  }

  
  onItemSelect(item){
    this.spinnerShown = true;
    this.temperature = '';
    
    console.log(item);
    this.selectedCity = item.name;
    let geoField = item.geo.split(' ');
    let lat = geoField[0];
    let lon = geoField[1];
    
    this._weatherService.weatherData(lat, lon).subscribe(data => {
       this.jsonData =  data;
       console.log(this.jsonData);      
       this.temperature = `${this.jsonData.current.temp} °C`;
       this.spinnerShown = false;           
    })                               
  }

  onItemDeSelect(){
    this.selectedCity = 'City';
  }

  dropdownSettings: IDropdownSettings = {
    singleSelection: true,    
    idField : 'geo',
    textField: 'name',
    allowSearchFilter: true,
    closeDropDownOnSelection: true,
    noDataAvailablePlaceholderText: 'no data found',    
    itemsShowLimit: 3
  };


}
