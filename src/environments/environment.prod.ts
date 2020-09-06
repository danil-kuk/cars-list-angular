import { FirebaseConfig } from 'src/app/core/models';

const firebaseConfig: FirebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
};

export const environment = {
  production: true,
  firebaseConfig,
};
