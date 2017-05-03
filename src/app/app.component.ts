import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  logoPath: string = '../assets/img/usaid_ofda_logo.png';

  constructor() {}

  ngOnInit() {
    
  }
}
