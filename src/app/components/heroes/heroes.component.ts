import { Component, OnInit } from '@angular/core';
import { HEROES } from 'src/app/shared/data/mock-heroes';
import { HeroService } from 'src/app/shared/services/hero.service';
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

  heroes!: HeroInterface[];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
    // HEROES.forEach((hero) => {
    //   this.heroService.createData(hero);
    // });
  }

  getHeroes(): any {
    this.heroService.getData().subscribe({
      next: (res: any[]) => {
        this.heroes = res;
        console.log('get data ');
        console.log(this.heroes);
      },
      error: (err) => console.error(err),
    });
  }
}
