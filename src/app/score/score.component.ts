import { Component, OnInit } from '@angular/core';
import { Player, Players } from '../shared/player-model';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class ScoreComponent {
  players: Player[] = [
      {
        username: 'torage',
        score: 4523
      },
      {
        username: 'torage1',
        score: 45232
      },
      {
        username: 'torage2',
        score: 453435
      },
      {
        username: 'torage3',
        score: 454435
      },
      {
        username: 'torage4',
        score: 453435
      }
    ];

    get playerArray() {
      return this.players;
    }
}
