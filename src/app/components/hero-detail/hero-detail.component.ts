import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/shared/services/hero.service';
import { HeroInterface } from 'src/app/shared/types/hero-interface';
import { Location } from '@angular/common';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  hero!: HeroInterface;

  constructor(
    private location: Location,
    private heroService: HeroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.heroService.getHero(id).subscribe((hero) => {
      if (hero) this.hero = hero;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
