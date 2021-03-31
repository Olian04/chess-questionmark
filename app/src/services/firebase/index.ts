import firebase from 'firebase/app';
import { firebaseConfig } from './config';

export const app = firebase.initializeApp(firebaseConfig);
