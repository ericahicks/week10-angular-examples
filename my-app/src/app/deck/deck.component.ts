import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {

  deck: any = [{sign: 'Taurus'},{sign: 'Aquarius'}];

  constructor() { }

  ngOnInit(): void {
  }

}
