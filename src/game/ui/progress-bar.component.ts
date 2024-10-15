import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostBinding,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'app-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full bg-gray-200 rounded-lg relative">
      <div
        class="h-5 {{ styleClass() }} rounded-lg transition-width duration-500"
        [style.width.%]="percentage()"
        (transitionend)="animEnd.emit($event)"
      ></div>
      <div
        class="absolute inset-0 flex justify-center items-center text-sm text-gray-700"
      >
        {{ current() }}/{{ max() }}
      </div>
    </div>
  `,
})
export class ProgressBarComponent {
  @HostBinding() class = 'block';
  readonly current = input<number>(0);
  readonly max = input<number>(1);
  readonly styleClass = input<string>('');
  readonly animEnd = output<any>();

  readonly percentage = computed(() => (100 * this.current()) / this.max());
}
