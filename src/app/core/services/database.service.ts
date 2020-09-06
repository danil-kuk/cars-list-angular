import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, from } from 'rxjs';

import { DatabaseItem } from '../dtos';

/**
 * Cloud Firestore database service.
 */
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  /**
   * Create Database service with Cloud Firestore database.
   * @param database Cloud Firestore database.
   */
  constructor(private database: AngularFirestore) {}

  /**
   * Perform GET request to database and get entries in collection.
   */
  public getAllItems(collectionId: string): Observable<DatabaseItem[]> {
    const request$ = this.database
      .collection<DatabaseItem>(collectionId)
      .valueChanges();
    return request$;
  }

  /**
   * Perform POST request to database that adds new item.
   * @param collectionId Cloud Firestore collection id.
   * @param item Item to add to database.
   */
  public postItem(collectionId: string, item: DatabaseItem): Observable<void> {
    item.id = this.database.createId();
    const request$ = from(
      this.database.collection(collectionId).doc(item.id).set(item),
    );
    return request$;
  }

  /**
   * Perform PATCH request to database.
   * @param collectionId Cloud Firestore collection id.
   * @param item Item to update in database.
   */
  public updateItem(
    collectionId: string,
    item: DatabaseItem,
  ): Observable<void> {
    const request$ = from(
      this.database.collection(collectionId).doc(item.id).update(item),
    );
    return request$;
  }

  /**
   * Perform DELETE request to database.
   * @param collectionId Cloud Firestore collection id.
   * @param itemId Id of item to delete.
   */
  public deleteItem(collectionId: string, itemId: string): Observable<void> {
    const request$ = from(
      this.database.collection(collectionId).doc(itemId).delete(),
    );
    return request$;
  }
}
