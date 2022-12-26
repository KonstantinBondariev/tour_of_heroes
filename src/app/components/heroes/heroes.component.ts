import { Component, OnInit } from '@angular/core';
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

  cureantId!: number;
  heroes!: HeroInterface[];
  heroName!: string;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getData().subscribe({
      next: (res: HeroInterface[]) => {
        this.heroes = res;
        let arrID: number[] = [];
        res.forEach((hero) => {
          arrID.push(hero.id);
        });
        this.cureantId = Math.max(...arrID);
      },
      error: (err) => console.error(err),
    });
  }

  addHero(heroName: string): void {
    this.heroService
      .createData(this.createNewHero(heroName))
      .subscribe((res) => {
        if (res) {
          this.getHeroes();
        }
      });
  }

  deleteHero(hero: HeroInterface): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  private createNewHero(heroName: string): HeroInterface {
    return {
      id: this.cureantId + 1,
      name: heroName,
    };
  }
}
