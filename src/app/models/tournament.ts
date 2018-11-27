import { from, of, Observable, Subject } from 'rxjs';
import { bufferCount, expand, map, take, tap, toArray } from 'rxjs/operators';

import { Gene } from './gene';

export class Tournament {
  playerList: Array<Gene>;
  games: Subject<number>;

  constructor(public rounds: number, seeds?: Array<Gene>) {
    this.games = new Subject();
    const players = Math.pow(2, rounds);
    const newPlayers = seeds ? players - seeds.length : players;
    this.playerList = seeds || [];
    for (let i = 0; i < newPlayers; i++) {
      this.playerList.push(new Gene());
    }
  }

  getGames(): Observable<number> {
    return this.games.asObservable();
  }

  resolveGame(): Observable<Array<Gene>> {
    const source = of(this.playerList);
    return source.pipe(
      expand(el => this.resolveRound(el)),
      take(this.rounds + 1)
    );
  }

  resolveRound(list: Array<Gene>): Observable<Array<Gene>> {
    const source = from(list);
    const couples = source.pipe(bufferCount(2));
    return couples.pipe(
      tap(el => this.games.next(1)),
      map(el => this.match(el)),
      toArray()
    );
  }

  match(genes: Gene | Array<Gene>): Gene {
    if (!genes) {
      console.log('error none');
      throw new Error();
    }
    if ((<Array<Gene>>genes).length !== 2) {
      console.log('error single');
      throw new Error();
    }
    const [ gene1, gene2 ] = <Array<Gene>>genes;
    gene1.resetHealth();
    gene2.resetHealth();
    const { first, second } =
        gene1.agility < gene2.agility ? { first: gene2, second: gene1 } : { first: gene1, second: gene2 };
    let winner = null;
    let rounds = 50;
    while (!winner && rounds > 0) {
      rounds--;
      let attFirst = Math.floor(first.attacks);
      let attSecond = Math.floor(second.attacks);
      let attacks = true;
      while (!winner && attacks && rounds > 0) {
        if (!winner && attFirst > 0) {
          second.solve(first);
          attFirst--;
          winner = second.currentHealth > 0 ? null : first;
        }
        if (!winner && attSecond > 0) {
          first.solve(second);
          attSecond--;
          winner = first.currentHealth > 0 ? null : second;
        }
        attacks = attFirst > 0 || attSecond > 0;
      }
      if (rounds === 0) {
        winner = first.currentHealth > second.currentHealth ? first : second;
      }
    }
    return winner;
  }

  // async resolveSet(first: Gene, second: Gene): Promise<{first: Gene, second: Gene}> {
  //   return new Promise<{first: Gene, second: Gene}>((resolve, reject) => {
  //     let attFirst = Math.floor(first.attacks);
  //     let attSecond = Math.floor(second.attacks);
  //     for (let i = 0; i < attFirst + attSecond; i++) {

  //     }
  //     resolve({first, second});
  //   });
  // }
}
