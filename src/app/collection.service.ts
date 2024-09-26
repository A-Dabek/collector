import {inject, Injectable} from "@angular/core";
import {collection, collectionData, Firestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";

export interface Id {
  id: string;
}

export interface Item {
  rarity: number;
  enhancement: string;
}

@Injectable()
export class CollectionService {
  private readonly firestore = inject(Firestore);
  private readonly collection = collection(this.firestore, 'items');

  readonly items$ = collectionData(
    this.collection,
    {
      idField: 'id',
    }
  ) as Observable<(Item & Id)[]>;
}
