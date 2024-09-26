import {Component, ChangeDetectionStrategy, input} from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M0 0h512v512H0z" [attr.fill]="backgroundFill()"/>
      <path [attr.fill]="fill()" [attr.d]="shape()"/>
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class IconComponent {
  fill = input('#ffffff');
  backgroundFill = input('#000000');
  shape = input('');
}
