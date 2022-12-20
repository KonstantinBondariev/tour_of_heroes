import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/shared/services/hero.service';
import { HeroInterface } from 'src/app/shared/types/hero-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  heroes: HeroInterface[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getData()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
}
