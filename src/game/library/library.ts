/*
(feasible)
- increase luck
- die - get a card of same rarity or not
- note with a sword - complete a task for points
- add 5 spaces with cards of every rarity
- play 5 random cards for free
- destroy a card and get a higher rarity card
- draw rare-less cards until space is full
- heal flat for every space available
- missing HP is max HP, full heal
- add missing health as max HP
- re-roll all cards
- shrink spaces with each distinct rarity

(needs play history)
- exhume a card
- parrot - same effect as previous

(needs targeting)
- ouroboros - play a card infinitely as long as it's possible (needs targetting)

(needs options)
- shop - buy a card for points
- goldfish/djinn - wishes

(unknown)
- fisherman - random fish?
- incognito - get a card without info
- time limit - lose hp? every second
- tick - drains life?
- chessboard - add chess pieces
*/

export type CardName =
  // common
  | 'card-pickup'
  | 'pill'
  | 'paper-bag-open'
  | 'spikes-init'
  | 'token'
  | 'plain-padlock'
  | 'piggy-bank' //FIXME not common

  // uncommon
  | 'paper-bag-crumpled'
  | 'hammer-break'
  | 'card-2-diamonds'
  | 'medicines'
  | 'shoulder-bag'
  | 'spikes-half'
  | 'two-coins';
