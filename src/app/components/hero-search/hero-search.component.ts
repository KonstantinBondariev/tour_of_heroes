import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HeroService } from 'src/app/shared/services/hero.service';
import { HeroInterface } from 'src/app/shared/types/hero-interface';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { debounce } from 'lodash';
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss'],
})
export class HeroSearchComponent implements OnInit {
  heroes$!: any;

  constructor(private heroService: HeroService) {
    this.search = debounce(this.search, 500);
  }

  ngOnInit(): void {}

  search(value: string): void {
    this.heroService.getData().subscribe((res) => {
      this.heroes$ = res.filter((hero) => hero.name.includes(value));
      console.log(this.heroes$);
    });
  }
}
