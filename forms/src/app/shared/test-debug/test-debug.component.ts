import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-test-debug',
  templateUrl: './test-debug.component.html',
  styleUrls: ['./test-debug.component.css']
})
export class TestDebugComponent implements OnInit {

  @Input() variavelInputProperty;
  constructor() { }

  ngOnInit() {
  }

}
