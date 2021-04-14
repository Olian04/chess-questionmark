import firebase from 'firebase';
import { app } from '.';
import 'firebase/firestore';
import { Game } from '../../types/Game';

const db = app.firestore();
