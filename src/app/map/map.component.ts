import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'MapComponent',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  @ViewChild('map') private mapContainer: ElementRef;
  @Input() data: any;

  showJson = false;

  returnJson() {
    this.showJson = !this.showJson;
  }

  ngOnInit() {
    
  }

  createChart() {
    
  }

  
}