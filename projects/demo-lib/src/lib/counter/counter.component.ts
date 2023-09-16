import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  counter = 0;
  constructor() { }

  ngOnInit(): void {
  }

  clickPlus(){
    this.counter += 1
  }

  clickMinus(){
    this.counter -= 1
  }


}
