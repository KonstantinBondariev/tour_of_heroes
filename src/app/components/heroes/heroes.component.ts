import { Component, OnInit } from '@angular/core';
import { HEROES } from 'src/app/shared/data/mock-heroes';
import { HeroInterface } from 'src/app/shared/types/hero-interface';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  hero: HeroInterface = {
    id: 1,
    name: 'Windstorm',
  };

  selectedHero!: HeroInterface;

  heroes: HeroInterface[] = HEROES;

  constructor() {}

  ngOnInit(): void {}

  onSelect(hero: HeroInterface): void {
    this.selectedHero = hero;
  }
}
