/**
 * Firebase connection config.
 * @see https://firebase.google.com/docs/firestore/quickstart#initialize
 */
export interface FirebaseConfig {
  /**
   * Firebase API key.
   */
  apiKey: string;

  /**
   * Firebase auth domain.
   */
  authDomain: string;

  /**
   * Firebase project id.
   */
  projectId: string;
}
