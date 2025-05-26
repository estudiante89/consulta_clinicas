
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-telemedicine-session',
  templateUrl: './telemedicine-session.component.html',
  styleUrls: ['./telemedicine-session.component.css']
})
export class TelemedicineSessionComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    console.log('Telemedicine session started');
  }

}
