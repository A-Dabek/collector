import { Rarity } from '../../ui/rarity';
import { CardAddAction } from '../actions/basic/card-add.action';
import { SetHealthAction } from '../actions/basic/set-health.action';
import { SetSpaceAction } from '../actions/basic/set-space.action';
import { GameUiState } from '../actions/ui-actions';
import { CardName } from '../cards/access';
import { BasePlayableCard, CardState, GameCard } from '../cards/card';
import { GameEngine, GameState } from '../logic/engine';

export class TestGameCard extends BasePlayableCard {
  override name: CardName = 'card-2-diamonds';
  override rarity: Rarity = 'common';

  private get initialState(): GameState {
    return { ...GameEngine.initialState };
  }

  constructor(
    private readonly options: {
      cards?: CardName[];
    },
  ) {
    super();
  }

  override costActions() {
    return [];
  }

  override play(state: GameState) {
    return [
      new SetHealthAction(this.initialState.maxHealth),
      new SetSpaceAction(this.initialState.space),
      new CardAddAction(this.options.cards || []),
    ];
  }
}

describe('Card', () => {
  async function setup(options: { startCard: GameCard }) {
    const engine = new GameEngine();
    const snapshots = [] as GameUiState[];
    await engine.playCard(options.startCard);
    engine.snapshots$.subscribe((s) => snapshots.push(s));
    const findCardId: (name: CardName) => number | undefined = (name) =>
      snapshots.at(-1)?.cards.find((card: CardState) => card.name === name)?.id;
    const getSanitizedLastSnapshot = () => {
      const snapshot = snapshots.at(-1)!;
      return {
        ...snapshot,
        cards: snapshot.cards.map((card) => ({
          ...card,
          id: undefined,
        })),
      };
    };
    return { engine, snapshots, findCardId, getSanitizedLastSnapshot };
  }

  describe('Token', () => {
    it('use', async () => {
      const { engine, snapshots, findCardId, getSanitizedLastSnapshot } =
        await setup({
          startCard: new TestGameCard({
            cards: ['token'],
          }),
        });
      const cardId = findCardId('token')!;
      await engine.playCardId(cardId);
      expect(snapshots.length).toBe(4);
      expect(getSanitizedLastSnapshot()).toMatchSnapshot();
    });
  });
});
