
/**
 * Cloud Firestore database response
 */
export interface DatabaseResponse {
  /** Cloud Firestore documents */
  documents: DatabaseDocument[];
}

/**
 * Cloud Firestore database document
 */
export interface DatabaseDocument {
  /** Document name  */
  name: string;

  /** Data fields */
  fields: object;
}
