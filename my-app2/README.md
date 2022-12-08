# MyApp2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.9.

## About the Application

This project demonstrates how to use ngOnInit in a component to set the style of an element on the page.

### Setup

The project has two componenents: Deck and Card.

The project has one model: Card
which has two properties: sign, color

**card.ts**
```
export class Card {
    sign: string;
    color: string;
    constructor(sign: string = 'Aquarius', color: string = 'light-grey') {
        this.sign = sign;
        this.color = color;
    }
}
```

The Deck component has one property: deck which contains an array of Card objects. The Card objects are displayed using an *ngFor.

**deck.component.ts**
```
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements OnInit {
  deck: any = [{sign: 'Taurus'},{sign: 'Aquarius'}];
  constructor() { }
  ngOnInit(): void { }
}
```

**deck.component.html**
```
<ng-container *ngFor="let card of deck; let i = index;">
    <app-card [card]="card"></app-card>
</ng-container>
```

The Card component has one property: card which is handed in from the parent component. The card property is displayed in a list in a div. 

**card.component.ts**
```
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
  ngOnInit(): void { }
}
```

**card.component.html**
```
<div>
    <h1>Card Info</h1>
    <ul>
        <li>{{ card.sign }}</li>
    </ul>
</div>
```

### Using [ngStyle]

The ngOnInit() method sets the card.color property depending on the card.sign property. 

In **card.component.ts**
```
  ngOnInit(): void {
    switch(this.card.sign) {
      case 'Taurus': this.card.color = 'pink'; break;
      case 'Aquarius': this.card.color = 'aqua'; break;
      default: this.card.color = 'light-grey';
    }
  }
```

The Card html's div uses [ngStyle] to set the background color of the div to the card.color property.

In **card.component.html**
```
<div [ngStyle]="{'background-color': card.color}">
   ...
</div>
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
