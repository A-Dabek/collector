/*
rare: cost4
- increase luck

legendary: cost5 - only special
- play 5 random cards for free
- destroy a card and get a higher rarity card
- draw rare-less cards until space is full
- heal flat for every space available
- missing HP is max HP, full heal
- add missing health as max HP
- re-roll all cards
- shrink spaces with each distinct rarity
- add 5 spaces with cards of every rarity

mythic: cost6 - only super special
- plain-padlock - lock health for next card
- goldfish/djinn - wishes
- fisherman - random fish?
- exhume a card
- note with a sword - complete a task for points
- incognito - get a card without info
- time limit - lose hp? every second
- tick - drains life?
- ouroboros - play a card infitenly
- shop - buy a card for points
- parrot - same effect as previous
- chessboard - add chess pieces
*/

export type CardName =
  // common
  | 'card-pickup'
  | 'pill'
  | 'paper-bag-open'
  | 'spikes-init'
  | 'token'
  | 'piggy-bank' //FIXME not common

  // uncommon
  | 'paper-bag-crumpled'
  | 'hammer-break'
  | 'card-2-diamonds'
  | 'medicines'
  | 'shoulder-bag'
  | 'spikes-half'
  | 'two-coins';
