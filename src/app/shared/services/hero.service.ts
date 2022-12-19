import { Injectable } from '@angular/core';
import { HEROES } from '../data/mock-heroes';
import { HeroInterface } from '../types/hero-interface';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { HeroResponse } from '../types/hero-response';
import { MessageService } from './message.service';

const url: string =
  'https://tour-of-heroes--30-11-22-default-rtdb.firebaseio.com/heroes';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messagesService: MessageService
  ) {}

  heroes!: HeroInterface[];

  getHeroes(): HeroInterface[] {
    return HEROES;
  }

  createData(hero: HeroInterface): void {
    this.http.post(`${url}.json`, hero).subscribe((res) => console.log(res));
  }

  getData(): Observable<HeroInterface[]> {
    return this.http.get<any>(`${url}.json`).pipe(
      map((res) => {
        if (res) this.messagesService.add('HeroService: fetched heroes');
        const arr: HeroInterface[] = [];
        Object.keys(res).forEach((key) => {
          arr.push({ key, ...res[key] });
        });
        return arr;
      })
    );
  }

  getHero(id: any): Observable<HeroInterface> {
    // return this.http.get<any>(`${url}.json`)

    this.messagesService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find((hero) => hero.id === id));
  }
}
function of(arg0: HeroInterface | undefined): Observable<HeroInterface> {
  throw new Error('Function not implemented.');
}
