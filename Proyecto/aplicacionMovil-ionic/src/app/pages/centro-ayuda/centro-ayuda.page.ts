import { Component, OnInit } from '@angular/core';
import { ScrollDetail } from '@ionic/angular';

@Component({
  selector: 'app-centro-ayuda',
  templateUrl: './centro-ayuda.page.html',
  styleUrls: ['./centro-ayuda.page.scss'],
})
export class CentroAyudaPage implements OnInit {

  handleScrollStart() {
    console.log('scroll start');
  }

  handleScroll(ev: CustomEvent<ScrollDetail>) {
    console.log('scroll', JSON.stringify(ev.detail));
  }

  handleScrollEnd() {
    console.log('scroll end');
  }
  
  constructor() { }

  ngOnInit() {
  }

}
