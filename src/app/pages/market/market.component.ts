import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-market',
    templateUrl: './market.component.html',
})
export class MarketComponent implements OnInit {
    instructions = [
        { number: 'About', description: 'The system automatically picks your province and district' },
        {
            number: 'Instructions',
            description:
        'Click Add record row below to add commodity price. You can add multiple commodity prices by clicking the same button',
        },
    ]

    constructor() {}
    ngOnInit() {}
}
