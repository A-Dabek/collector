import { ItemId } from '../../services/collection-persistence.service';
import {
  cardCostAction,
  cardDrawAction,
  changeMaxHpAction,
  combineActions,
  destroyAction,
  destroyRandomAction,
  earnPointsAction,
  expandAction,
  healAction,
  healMaxHpAction,
  healMissingHpAction,
  increaseLuckAction,
  ResponseActions,
  shrinkAction,
  shrinkRandomAction,
} from './actions'; /*

IDEAS
- goal: get X points for every space
- each level X+1

common: cost1 - draw, heal, expand, destroy
- #1 draw 1 card
- #1 heal flat
- #1 expand space
- destroy a random card
- get a point
uncommon: cost2 + combo, shrink
- #2 draw 2 cards
- #2 heal flat x2
- #2 expand 2 space
- shrink 1 with random item (removes points by percentage)
- #2 destroy selected item
- draw & heal
- draw & expand
- heal & expand
- draw & destroy
- heal & destroy
- expand & destroy
rare: cost3 + maxHP, heal missing
- #3 draw 3 cards
- #3 heal flat x3
- #3 expand 3 space
- shrink 1 chosen space
- shrink 2 space with random items (random)
- increase max HP by flat
- less max HP and shrink
- less max HP draw 4
- heal half missing HP
- combos?
epic: cost4 + luck, heal max HP
- increase luck slightly
- draw 4 cards
- heal flat x4
- expand 4 space
- shrink 3 space empty or not (random)
- increase max HP by flat 2
- heal half max HP
- combos?
legendary: cost5 - only special
- play 5 random cards for free
- destroy a card and get a higher rarity card
- draw rare-less cards until space is full
- heal flat for every space available
mythic: cost6 - only super special
- missing HP is max HP, full heal
- add missing health as max HP
- re-roll all cards
- shrink spaces with each distinct rarity
- add 5 spaces with cards of every rarity
*/

/*

IDEAS
- goal: get X points for every space
- each level X+1

common: cost1 - draw, heal, expand, destroy
- #1 draw 1 card
- #1 heal flat
- #1 expand space
- destroy a random card
- get a point
uncommon: cost2 + combo, shrink
- #2 draw 2 cards
- #2 heal flat x2
- #2 expand 2 space
- shrink 1 with random item (removes points by percentage)
- #2 destroy selected item
- draw & heal
- draw & expand
- heal & expand
- draw & destroy
- heal & destroy
- expand & destroy
rare: cost3 + maxHP, heal missing
- #3 draw 3 cards
- #3 heal flat x3
- #3 expand 3 space
- shrink 1 chosen space
- shrink 2 space with random items (random)
- increase max HP by flat
- less max HP and shrink
- less max HP draw 4
- heal half missing HP
- combos?
epic: cost4 + luck, heal max HP
- increase luck slightly
- draw 4 cards
- heal flat x4
- expand 4 space
- shrink 3 space empty or not (random)
- increase max HP by flat 2
- heal half max HP
- combos?
legendary: cost5 - only special
- play 5 random cards for free
- destroy a card and get a higher rarity card
- draw rare-less cards until space is full
- heal flat for every space available
mythic: cost6 - only super special
- missing HP is max HP, full heal
- add missing health as max HP
- re-roll all cards
- shrink spaces with each distinct rarity
- add 5 spaces with cards of every rarity
*/

const commonActions = [
  cardDrawAction(1),
  healAction(1),
  expandAction(1),
  destroyRandomAction(1),
  earnPointsAction(1),
];

const uncommonActions = [shrinkRandomAction(1), destroyAction()];

const rareActions = [
  changeMaxHpAction(1),
  shrinkAction(0),
  healMissingHpAction(0),
];

const epicActions = [increaseLuckAction(1), healMaxHpAction(1)];

export function cardFactory(item: ItemId): ResponseActions {
  switch (item.id) {
    // common cards
    case 'wooden-helmet':
      return combineActions([cardDrawAction(1)]);
    case 'steel-door':
      return combineActions([healAction(1)]);
    case 'spiked-ball':
      return combineActions([expandAction(1)]);
    case 'telescopic-baton':
      return combineActions([destroyRandomAction(1)]);
    case 'talk':
      return combineActions([earnPointsAction(1)]);

    // uncommon cards
    case 'burning-skull':
      return combineActions([shrinkRandomAction(1)]);
    case 'infinity':
      return combineActions([cardDrawAction(1), healAction(1)]);
    case 'violin':
      return combineActions([cardDrawAction(1), expandAction(1)]);
    case 'heart-minus':
      return combineActions([cardDrawAction(1), earnPointsAction(1)]);
    case 'topaz':
      return combineActions([healAction(1), earnPointsAction(1)]);
    case 'orb-wand':
      return combineActions([healAction(1), expandAction(1)]);
    case 'chain-mail':
      return combineActions([destroyRandomAction(1), cardDrawAction(1)]);
    case 'skull-with-syringe':
      return combineActions([destroyRandomAction(1), healAction(1)]);
    case 'heart-plus':
      return combineActions([expandAction(1), earnPointsAction(1)]);
    case 'digital-trace':
      return combineActions([expandAction(2)]);
    case 'spinning-top':
      return combineActions([cardDrawAction(2)]);
    case 'spotted-bug':
      return combineActions([healAction(2)]);
    case 'steel-door':
      return combineActions([destroyRandomAction(2)]);
    case 'swirled-shell':
      return combineActions([earnPointsAction(2)]);
    case 'swirled-shell':
      return combineActions([destroyAction()]);

    // rare cards
    case 'diamond-sword':
      return combineActions([changeMaxHpAction(1)]);
    case 'golden-shield':
      return combineActions([shrinkAction(0)]);
    case 'phoenix-feather':
      return combineActions([healMissingHpAction(0)]);

    // Adding rare cards by combining 1 uncommon action and 1 common action
    case 'rare-combo1':
      return combineActions([shrinkRandomAction(1), cardDrawAction(1)]);
    case 'rare-combo2':
      return combineActions([shrinkRandomAction(1), healAction(1)]);
    case 'rare-combo3':
      return combineActions([shrinkRandomAction(1), expandAction(1)]);
    case 'rare-combo4':
      return combineActions([shrinkRandomAction(1), destroyRandomAction(1)]);
    case 'rare-combo5':
      return combineActions([shrinkRandomAction(1), earnPointsAction(1)]);

    case 'rare-combo6':
      return combineActions([destroyAction(), cardDrawAction(1)]);
    case 'rare-combo7':
      return combineActions([destroyAction(), healAction(1)]);
    case 'rare-combo8':
      return combineActions([destroyAction(), expandAction(1)]);
    case 'rare-combo9':
      return combineActions([destroyAction(), destroyRandomAction(1)]);
    case 'rare-combo10':
      return combineActions([destroyAction(), earnPointsAction(1)]);

    // Adding more rare cards by combining 1 common action with argument 1 and 1 common action with argument 2
    case 'rare-combo21':
      return combineActions([cardDrawAction(1), healAction(2)]);
    case 'rare-combo22':
      return combineActions([cardDrawAction(1), expandAction(2)]);
    case 'rare-combo23':
      return combineActions([cardDrawAction(1), destroyRandomAction(2)]);
    case 'rare-combo24':
      return combineActions([cardDrawAction(1), earnPointsAction(2)]);

    case 'rare-combo25':
      return combineActions([healAction(1), cardDrawAction(2)]);
    case 'rare-combo26':
      return combineActions([healAction(1), expandAction(2)]);
    case 'rare-combo27':
      return combineActions([healAction(1), destroyRandomAction(2)]);
    case 'rare-combo28':
      return combineActions([healAction(1), earnPointsAction(2)]);

    case 'rare-combo29':
      return combineActions([expandAction(1), cardDrawAction(2)]);
    case 'rare-combo30':
      return combineActions([expandAction(1), healAction(2)]);
    case 'rare-combo31':
      return combineActions([expandAction(1), destroyRandomAction(2)]);
    case 'rare-combo32':
      return combineActions([expandAction(1), earnPointsAction(2)]);

    case 'rare-combo33':
      return combineActions([destroyRandomAction(1), cardDrawAction(2)]);
    case 'rare-combo34':
      return combineActions([destroyRandomAction(1), healAction(2)]);
    case 'rare-combo35':
      return combineActions([destroyRandomAction(1), expandAction(2)]);
    case 'rare-combo36':
      return combineActions([destroyRandomAction(1), earnPointsAction(2)]);

    case 'rare-combo37':
      return combineActions([earnPointsAction(1), cardDrawAction(2)]);
    case 'rare-combo38':
      return combineActions([earnPointsAction(1), healAction(2)]);
    case 'rare-combo39':
      return combineActions([earnPointsAction(1), expandAction(2)]);
    case 'rare-combo40':
      return combineActions([earnPointsAction(1), destroyRandomAction(2)]);

    // Adding rare cards by common x3
    case 'rare-combo11':
      return combineActions([cardDrawAction(3)]);
    case 'rare-combo12':
      return combineActions([healAction(3)]);
    case 'rare-combo13':
      return combineActions([expandAction(3)]);
    case 'rare-combo14':
      return combineActions([destroyRandomAction(3)]);
    case 'rare-combo15':
      return combineActions([earnPointsAction(3)]);

    // epic cards
    case 'epic-card1':
      return combineActions([increaseLuckAction(1)]);
    case 'epic-card2':
      return combineActions([healMaxHpAction(1)]);

    // Adding epic cards that use 1 common action with argument 4
    case 'epic-combo1':
      return combineActions([cardDrawAction(4)]);
    case 'epic-combo2':
      return combineActions([healAction(4)]);
    case 'epic-combo3':
      return combineActions([expandAction(4)]);
    case 'epic-combo4':
      return combineActions([destroyRandomAction(4)]);
    case 'epic-combo5':
      return combineActions([earnPointsAction(4)]);

    // default case for unknown cards
    default:
      throw new Error(`no such card ${item.id}`);
  }
}
