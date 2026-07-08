import { Component, Input } from '@angular/core';
import {
  FaIconComponent,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-title-card',
  imports: [FaIconComponent, NgClass],
  templateUrl: './title-card.component.html',
  styleUrl: './title-card.component.scss',
})
export class TitleCardComponent {
  @Input({ required: true }) itemsCount!: number | undefined;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) icon!: IconDefinition;
  @Input({ required: true }) color!: 'red' | 'blue' | 'green';
}
