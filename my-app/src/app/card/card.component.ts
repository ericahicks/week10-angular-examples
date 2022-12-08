import { Component, Input, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { Card } from '../models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements AfterViewInit {

  @Input() card: Card = new Card();

  @ViewChild('mainDiv') el!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    console.log(this.el)
    
    switch(this.card.sign) {
      case 'Aquarius': this.renderer.setStyle(this.el.nativeElement, 'background-color', 'aqua'); break;
      case 'Taurus': this.renderer.setStyle(this.el.nativeElement, 'background-color', 'pink'); break;
      default: this.renderer.setStyle(this.el.nativeElement, 'background-color', 'light-grey');
    }
  }

}
