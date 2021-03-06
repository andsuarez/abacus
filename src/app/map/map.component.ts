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
    // this.loadData();
    this.createMap();
  }
 

  loadData() {
      this.abacusService.getdashboardMapQueryVO1Data().subscribe(
          (data) => {
            console.log('getdashboardMapQueryVO1Data called!');
            this.dashboardMapQueryData = data;
            console.log(this.dashboardMapQueryData);
          },
          (error) => {console.log(error)}
        );

      this.abacusService.gethomePageMapRegionCountryVO1Data().subscribe(
          (data) => {
            console.log('gethomePageMapRegionCountryVO1Data called!');
            this.homePageMapRegionCountryData = data;
            console.log(this.homePageMapRegionCountryData);
          },
          (error) => {console.log(error)}
        );

      this.abacusService.gethomePageMapRegionCountryProjectVO1Data().subscribe(
          (data) => {
            console.log('gethomePageMapRegionCountryProjectVO1Data called!');
            this.homePageMapRegionCountryProject = data;
            console.log(this.homePageMapRegionCountryProject);
          },
          (error) => {console.log(error)}
        );

      this.abacusService.getHomePageMapRegionCountrySectorVO1Data().subscribe(
        (data) => {
          console.log('getHomePageMapRegionCountrySectorVO1Data called!');
          this.homePageMapRegionCountrySector = data;
          console.log(this.homePageMapRegionCountrySector);
        },
        (error) => {console.log(error)}
      );

  }

  stopped() {
    alert('stopped() clicked')
    if (d3.event.defaultPrevented) {
      d3.event.stopPropatation()
    };
  }

  createMap() {
    let element = this.map.nativeElement;
    this.h = element.offsetHeight;
    this.w = element.offsetWidth;
    let active = d3.select(null);

    // creates projection, meaning takes a spherical object and decides where each point should be placed in a flat object (like a screen)
    let projection = d3.geoMercator()
        .translate([this.w/2, this.h/1.6]) //so it's placed in the middle of the visual
        .scale(180);

    //zoom-scroll
    let zoom = d3.zoom()
      .scaleExtent([1, 20])
      .on('zoom', () => {
        g.style('stroke-width', 1.5 / d3.event.transform.k + "px");
        g.attr('transform', d3.event.transform);
      });

    // creates line paths based on the projections from above
    let path = d3.geoPath()
            .projection(projection);

    let svg = d3.select(element).append('svg')
              .attr('width', this.w)
              .attr('height', this.h)
              .on('click', this.stopped, true);

    // svg.append('rect')
    //   .attr('width', this.w)
    //   .attr('height', this.h)
    //   .attr('fill', '#ffffff')
    //   .on('click', reset);

    let g = svg.append('g');

    svg.call(zoom);

    function clicked(d) {
      alert('clicked function()');
      if(active.node() === this) {
        return reset();
      }
      active.classed('active', false);
      active = d3.select(this).classed('active', true);

      let bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / this.w, dy / this.w))),
        translate = [this.w / 2 - scale * x, this.h / 2 - scale * y];

        svg.transition()
          .duration(750)
          .call(this.zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale))
    }

    function reset() {
      alert('reset() called');
      active.classed('active', false);
      active = d3.select(null);

      svg.transition()
        .duration(750)
        .call(this.zoom.transform, d3.zoomIdentity);
    }


    d3.json('./assets/countries-topo.json', (error, data) => {
      if (error) {
        console.log(error);
      } else {
        this.mapData = data;
        // console.log(this.mapData);


        //converts topoJSON into geoJSON, accepts the returned data as first argument and targeted item as the second argument (this being the countries object)
        let countries = topojson.feature(data, this.mapData.objects.countries).features;
        // console.log(countries);

        g.selectAll('.country').data(countries)
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
            .on('click', clicked)
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
