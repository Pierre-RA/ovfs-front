import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Gene, Tournament } from 'src/app/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  tournament: Tournament;
  rounds: Array<Array<{ gene: Gene, winner: boolean}>>;
  games: number;
  loading: boolean;

  constructor() {
    this.games = 0;
    this.rounds = [];
  }

  ngOnInit() {
    this.loading = true;
    this.tournament = new Tournament(12);
  }

  ngAfterViewInit() {
    this.tournament.resolveGame().subscribe(data => {
      this.rounds.push(data.map(el => ({gene: el, winner: false})));
      if (this.rounds.length > 1) {
        const el = this.rounds[this.rounds.length - 2];
        data.forEach(item => {
          el.find(s => s.gene.name === item.name).winner = true;
        });
      }
      if (this.rounds.length === 13) {
        this.loading = false;
      }
    });
  }

}
