import { Component, OnInit, Input } from '@angular/core';
import { HeroInterface } from 'src/app/shared/types/hero-interface';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero!: HeroInterface;

  constructor() {}

  ngOnInit(): void {}
}
