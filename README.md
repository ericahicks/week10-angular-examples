## How to add style dynamically to an element using ngOnInit or ngAfterViewInit

### Setup a project to work with

In the terminal run the following commands:
```
ng new my-app
cd my-app
ng g c deck
ng g c card
cd src
cd app
mkdir models
cd models
ng g class card
```

The project has two componenents: Deck and Card.

The project has one model: Card which needs two properties: sign, color

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

The Deck component has one property: deck which contains an array of Card objects. Display the Card objects using an *ngFor.

**deck.component.ts**
```
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent implements AfterViewInit {
  deck: any = [{sign: 'Taurus'},{sign: 'Aquarius'}];
  constructor() { }
  ngAfterViewInit(): void { }
}
```

**deck.component.html**
```
<ng-container *ngFor="let card of deck; let i = index;">
    <app-card [card]="card"></app-card>
</ng-container>
```

The Card component has one property: card which is handed in from the parent component. Display the card sign property in a list in a div. 

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

Add some styles to the cards:

**card.component.css**
```
div {
    background-color: lightgray;
    border-radius: 8px;
    padding: 20px 20px 20px 40px;
    width: 150px;
    margin-bottom: 10px;
    margin-top: 12px;
    border: solid 1px black;
}
section ul li:first-of-type {
    font-weight: bold;
    text-transform: uppercase;
}
```

Use one of the below methods to apply a color to the card based on its sign property.

## Method 1: ngOnInit and ngStyle

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

## Method 2: ngAfterViewInit and DOM manipulation using an ElementRef and Renderer2

To use DOM manipulation in Angular, we will need:
1. To get a reference to the HTML element we want to update. 
    - In the .ts file, we will use the `ElementRef` type from `angular/core`.
    - In the .html file, we will use a template reference `<div #mainDiv>...</div>`
    - In the .ts file, we will use the `@ViewChild()` property decorator to find the element in the view DOM
2. To manipulate the HTML element, 
    - In the .ts file, we will use our `ElementRef` and a renderer object of type `Renderer2` from `angular/core`

#### Step 1: Update the imports

In **card.component.ts**
```
import { Component, Input, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
```

#### Step 2: Add the template reference

The #mainDiv template reference is added to our div in the card.component.html file.

**card.component.html**
```
<div #mainDiv>
   ...
</div>
```

#### Step 3: Get the Element

The CardComponent needs a new property containing a reference to the HTML element we want to update, specifically, our div.

**card.component.ts**
```
 @ViewChild('mainDiv') el!: ElementRef;
```

#### Step 4: Inject a renderer in the constructor

The constructor uses dependency injection to get a renderer that we will use to manipulate the `ElementRef`.
In **card.component.ts**
```
constructor(private renderer: Renderer2) { }
```

#### Step 5: Update the Element in the ngAfterViewInit() method

The `ngAfterViewInit()` contains a switch statement to set the color of the div. Note, we are using the `ElementRef` nativeElement property which the renderer needs to operate on. The renderer has a `.setStyle( ... )` method that we use. The first argument is the element to manipulate. The second argument is the css property we want to set. The third argument is the value we want to set the css property to. 

In **card.component.ts**
```
ngAfterViewInit(): void {
    console.log(this.el)
    
    switch(this.card.sign) {
      case 'Aquarius': this.renderer.setStyle(this.el.nativeElement, 'background-color', 'aqua'); break;
      case 'Taurus': this.renderer.setStyle(this.el.nativeElement, 'background-color', 'pink'); break;
      default: this.renderer.setStyle(this.el.nativeElement, 'background-color', 'light-grey');
    }
  }
```

#### Summary of Steps

Putting it all together, you should have

**card.component.html**
```
<div #mainDiv>
<h1>Card Info</h1>
<ul>
    <li>{{ card.sign }}</li>
</ul>
</div>
```


**card.component.ts**
```
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
```

