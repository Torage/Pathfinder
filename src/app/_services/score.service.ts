import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { PointOfInterest, Achievement, Highscore } from '../_models/score.model';
import { Observable } from 'rxjs';

@Injectable() export class ScoreService {

  constructor(private http: HttpClient) {
  }

  getHighscore(): Observable<Highscore> {
    return this.http.get<Highscore>('http://localhost:8080/user/highscore', {observe: 'response'})
      .pipe(map(response => {
        if (response) {
          let highScore: Highscore;
          highScore = response.body;
          return highScore;
        }
        return null;
      }));
  }

  getHighscoreList(): Observable<Highscore[]> {
    return this.http.get<Highscore[]>(`http://localhost:8080/highscore/${10}`, {observe: 'response'})
      .pipe(map(response => {
        if (response) {
          let highScore: Highscore[];
          highScore = response.body;
          return highScore;
        }
        return null;
      }));
  }

  getAchievements(): Observable<Achievement[]> {
    return this.http.get<Achievement[]>('http://localhost:8080/user/achievements', {observe: 'response'})
      .pipe(map(response => {
        if (response) {
          let achievements: Achievement[];
          achievements = Object.values(response.body);
          return achievements;
        }
        return null;
      }));
  }

  getPoiList(): Observable<PointOfInterest[]> {
    return this.http.get<PointOfInterest[]>('http://localhost:8080/pointsofinterest/all', {observe: 'response'})
      .pipe(map(response => {
        console.log(response);
        if (response) {
          let pointOfInterestList: PointOfInterest[];
          pointOfInterestList = Object.values(response.body);
          return pointOfInterestList;
        }
        return null;
      }));
  }

  getUserPoiList(): Observable<PointOfInterest[]> {
    return this.http.get<PointOfInterest[]>('http://localhost:8080/user/pointsofinterest', {observe: 'response'})
      .pipe(map(response => {
        if (response) {
          let pointOfInterestList: PointOfInterest[];
          pointOfInterestList = Object.values(response.body);
          return pointOfInterestList;
        }
        return null;
      }));
  }

  completePoi(id: string, value: number) {
    console.log('id+value' + id + value );
    return this.http.post<PointOfInterest[]>(`http://localhost:8080/user/pointsofinterest/${id}/complete/${value}`, {observe: 'response'})
      .pipe(first())
      .subscribe(res => {
          console.log(res);
      });
      // .pipe(map(response => {
      //     console.log(response);
      //     // if (response) {
      //     //   let pointOfInterest: PointOfInterest[];
      //     //   pointOfInterest = {
      //     //     id: response.id,
      //     //     lat: response.lat,
      //     //     lng: response.lng,
      //     //     active: response.active
      //     //   };
      //     //   return pointOfInterest;
      //     // }
      //     console.log('NULL');
      //     return null;
      // })

  }

  addMultiplePoi(locations: Position[]) {
    return this.http.post<Position[]>('http://localhost:8080/pointsofinterest/add?password=brilliant', locations, {observe: 'response'})
      .pipe(map(response => {
        if (response) {
          return response;
        }
        return null;
      }));
  }
}
