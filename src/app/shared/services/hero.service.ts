import { Injectable } from '@angular/core';
import { HeroInterface } from '../types/hero-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of, tap, catchError } from 'rxjs';
import { HeroResponse } from '../types/hero-response';
import { MessageService } from './message.service';

const url: string =
  'https://tour-of-heroes--30-11-22-default-rtdb.firebaseio.com/heroes';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messagesService: MessageService
  ) {}

  heroes!: HeroInterface[];

  createData(hero: HeroInterface): Observable<HeroInterface> {
    return this.http.post(`${url}.json`, hero).pipe(
      tap<any>((_) => this.log(`Created hero id=${hero.id}`)),
      catchError(this.handleError<HeroInterface>('createHero'))
    );
  }

  getData(): Observable<HeroInterface[]> {
    return this.http
      .get<any>(`${url}.json`)
      .pipe(catchError(this.handleError<HeroInterface[]>(`getHeroes`, [])))
      .pipe(tap((_) => this.log('fetched heroes')))
      .pipe(
        map((res) => {
          const arr: HeroInterface[] = [];
          Object.keys(res).forEach((key) => {
            arr.push({ key, ...res[key] });
          });
          return arr;
        })
      );
  }

  getHero(id: number): Observable<HeroInterface | undefined> {
    return this.http
      .get<any>(`${url}.json`)
      .pipe(
        tap((_) => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<HeroInterface>(`getHero hero id: ${id}`))
      )
      .pipe(
        map((res) => {
          const arr: HeroInterface[] = [];

          Object.keys(res).forEach((key) => {
            arr.push({ key, ...res[key] });
          });

          return arr.find((hero) => hero.id == id);
        })
      );
  }

  updateHero(hero: HeroInterface): Observable<HeroInterface> {
    return this.http
      .put<any>(`${url}/${hero.key}.json`, hero, httpOptions)
      .pipe(
        tap((_) => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<HeroInterface>('updateHero'))
      );
  }

  deleteHero(hero: HeroInterface): Observable<HeroInterface> {
    return this.http.delete<any>(`${url}/${hero.key}.json`, httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${hero.id}`)),
      catchError(this.handleError<HeroInterface>('deleteHero'))
    );
  }

  private log(message: string): void {
    this.messagesService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
