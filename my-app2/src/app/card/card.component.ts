import { Component, OnInit, Input } from '@angular/core';
import { Card } from '../models/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() card: Card = new Card();
  constructor() { }

  ngOnInit(): void {
    switch(this.card.sign) {
      // case 'Tarus': this.card.color = 'pink'; break;
      case 'Aquarius': this.card.color = 'aqua'; break;
      // default: this.card.color = 'white';
    }
  }

}
