import { Component, OnInit } from '@angular/core';

import { AbacusService } from './shared/abacus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logoPath: string = '../assets/img/usaid_ofda_logo.png';

  constructor(private abacusService: AbacusService) { }
  mapData: any = {};

  ngOnInit() {
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    setTimeout(() => {
      this.abacusService.getData().subscribe(
          (data) => {this.mapData = data; console.log(this.mapData)},
          (error) => {console.log(error)}
        );
    }, 1000);
  }


}
