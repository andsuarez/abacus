import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

import { AbacusService } from '../shared/abacus.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [AbacusService]
})
export class MapComponent implements OnInit {
  @ViewChild('map') map: ElementRef;

  title: string = 'Map';
  mapData: any;
  dashboardMapQueryData: any;
  homePageMapRegionCountryData: any;
  homePageMapRegionCountryProject: any;
  homePageMapRegionCountrySector: any;
  margins: any = {'top': 20, 'right': 20, 'bottom':20, 'left': 20};
  h: number;
  w: number;

  constructor(private abacusService: AbacusService) { }

  ngOnInit() {
    this.loadData();
    this.createMap();
  }
 

  loadData() {
      // this.abacusService.getdashboardMapQueryVO1Data().subscribe(
      //     (data) => {
      //       console.log(data);
      //       this.dashboardMapQueryData = data;
      //     },
      //     (error) => {console.log(error)}
      //   );

      // this.abacusService.gethomePageMapRegionCountryVO1Data().subscribe(
      //     (data) => {
      //       console.log(data);
      //       this.homePageMapRegionCountryData = data;
      //     },
      //     (error) => {console.log(error)}
      //   );

      // this.abacusService.gethomePageMapRegionCountryProjectVO1Data().subscribe(
      //     (data) => {
      //       console.log(data);
      //       this.homePageMapRegionCountryProject = data;
      //     },
      //     (error) => {console.log(error)}
      //   );

      // this.abacusService.getHomePageMapRegionCountrySectorVO1Data().subscribe(
      //   (data) => {
      //     console.log(data);
      //     this.homePageMapRegionCountrySector = data;
      //   },
      //   (error) => {console.log(error)}
      // );

  }

  createMap() {
    let element = this.map.nativeElement;
    this.h = element.offsetHeight;
    this.w = element.offsetWidth;
    let svg = d3.select(element).append('svg')
              .attr('width', this.w)
              .attr('height', this.h);

    d3.json('./assets/countries-topo.json', (error, data) => {
      if (error) {
        console.log(error);
      } else {
        this.mapData = data;
        // console.log(this.mapData);

        // creates projection, meaning takes a spherical object and decides where each point should be placed in a flat object (like a screen)
        let projection = d3.geoMercator()
            .translate([this.w/2, this.h/2]) //so it's placed in the middle of the visual
            .scale(130);

        // creates line paths based on the projections from above
        let path = d3.geoPath()
            .projection(projection);

        //converts topoJSON into geoJSON, accepts the returned data as first argument and targeted item as the second argument (this being the countries object)
        let countries = topojson.feature(data, this.mapData.objects.countries).features;
        console.log(countries);

        svg.selectAll('.country').data(countries)
            .enter()
            .append('path')
            .attr('class', 'country')
            .attr('d', path) // "d" is the attribute to make a path visible, and path is the path that is generated above
            .style('fill', function(d, i){
              if (countries[i].properties.code === '-99'){
                return '#666666';
              }
            })
            .style('stroke', '#d7d7d7')
            .on('click', function(d, i) {
              if (countries[i].properties.code !== '-99'){
                d3.select(this).style('fill','orange');
              }
            })
            .on('mouseenter', function(d, i) {
              if (countries[i].properties.code !== '-99' && d3.select(this).attr('style').indexOf('fill: orange') === -1 ){
                d3.select(this).style('fill','#b2b2b2');
              }
            })
            .on('mouseout', function(d, i) {
              if (countries[i].properties.code !== '-99' && d3.select(this).attr('style').indexOf('fill: rgb(178, 178, 178)') !== -1 ){
                d3.select(this).style('fill','#000000');
              }
            });
      }
    });
    
  }

}
