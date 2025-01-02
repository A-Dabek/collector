import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, interval, startWith, switchMap } from 'rxjs';
import { GameRunService } from '../services/game-run.service';
import { GameUiState, UiAction } from './actions/ui-actions';
import { Card } from './library/access';
import { GameEngine } from './logic/engine';
import { SetEnabledStatusAction } from './actions/set-enabled-status.action';
import { CardPlayAction } from './actions/card-play.action';
import { GameMenuComponent } from './ui/menu.component';
import { GameBarsComponent } from './ui/bars.component';
import { GameBoardComponent } from './ui/board.component';
import { SetStateAction } from './actions/set-state.action';

@Component({
  selector: 'app-game-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GameMenuComponent, GameBarsComponent, GameBoardComponent],
  template: `
    <app-game-menu [lastUiAction]="lastUiAction()" (restart)="onRestart()" />
    <app-game-bars
      [points]="state().points"
      [maxPoints]="state().maxPoints"
      [health]="state().health"
      [maxHealth]="state().maxHealth"
    />
    <app-game-board
      [space]="state().space"
      [cards]="state().cards"
      (play)="onPlay($event)"
    />
  `,
})
export class GameViewComponent implements OnInit {
  private readonly gameRunService = inject(GameRunService);

  readonly state = signal<GameUiState>({
    ...GameEngine.initialState,
  });

  readonly uiActions = signal<UiAction[]>([]);
  readonly lastUiAction = signal<UiAction | undefined>(undefined);
  private readonly now$ = new BehaviorSubject(0);

  constructor() {
    this.now$
      .pipe(
        takeUntilDestroyed(),
        switchMap(() => interval(500).pipe(startWith(0))),
      )
      .subscribe(() => {
        this.nextAnimation();
      });
  }

  async ngOnInit() {
    await this.startNewGame();
  }

  private async startNewGame() {
    const uiActions = await this.gameRunService.newGame();
    this.onNewActions(uiActions);
  }

  async onRestart() {
    const uiActions = await this.gameRunService.finish(false);
    this.onNewActions(uiActions);
    await this.startNewGame();
  }

  async onPlay(card: Card) {
    const uiActions = await this.gameRunService.play(card);
    this.onNewActions(uiActions);
  }

  private onNewActions(actions: UiAction[]) {
    this.state.update((state) => ({ ...state }));
    this.uiActions.update((oldActions) => {
      const allActions = [...oldActions, ...actions];
      const enabledActions = allActions.filter(
        (action) =>
          action instanceof SetEnabledStatusAction ||
          action instanceof CardPlayAction,
      );
      const finalizeStateAction = allActions.filter(
        (action) => action instanceof SetStateAction,
      );
      const otherActions = allActions.filter(
        (action) =>
          !enabledActions.includes(action as any) &&
          !finalizeStateAction.includes(action as any),
      );
      return [
        ...enabledActions,
        ...otherActions,
        ...finalizeStateAction.slice(-1),
      ];
    });
    this.now$.next(0);
  }

  private nextAnimation() {
    const current = this.uiActions()[0];
    this.lastUiAction.set(current);
    if (!current) {
      this.state.update((state) => ({ ...state }));
      return;
    }
    console.log('[UI]', current);
    this.uiActions.update(([, ...rest]) => rest);
    this.state.update((state) => current.update(state));

    // Continue applying actions of type 'setEnabledStatus'
    while (
      this.uiActions()[0] instanceof SetEnabledStatusAction ||
      this.uiActions()[0] instanceof CardPlayAction
    ) {
      const nextAction = this.uiActions()[0];
      this.uiActions.update(([, ...nextRest]) => nextRest);
      this.state.update((state) => nextAction.update(state));
    }
  }
}
