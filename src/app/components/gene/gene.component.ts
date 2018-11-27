import { Component, OnInit, Input } from '@angular/core';
import { Gene } from 'src/app/models';

@Component({
  selector: 'app-gene',
  templateUrl: './gene.component.html',
  styleUrls: ['./gene.component.scss']
})
export class GeneComponent implements OnInit {

  @Input()
  gene: Gene;

  @Input()
  hasWon: boolean;

  show: boolean;

  constructor() {
    this.show = false;
  }

  ngOnInit() {
  }

  toggleResume() {
    this.show = !this.show;
  }

}
