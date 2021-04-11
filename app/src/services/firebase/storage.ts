import firebase from 'firebase';
import { app } from '.';
import 'firebase/firestore';
import { User } from '../../types/User';
import { Profile } from '../../types/Profile';
import { UserExtras } from '../../types/UserExtras';

const db = app.firestore();

export const profileCollection = {
  collection: db.collection('profiles'),
  get: async function (id: string) {
    const document = await this.collection.doc(id).get();
    if (!document.exists) throw new Error('Document does not exist');

    return document.data() as Profile;
  },
  set: async function (id: string, document: Partial<Profile>) {
    await this.collection
      .doc(id)
      .set(document)
      .catch((e) => console.log(e));
  },
  update: async function (id: string, document: Partial<Profile>) {
    await this.collection
      .doc(id)
      .update(document)
      .catch((e) => console.log(e));
  },
};

export const userCollection = {
  collection: db.collection('users'),
  get: async function (id: string) {
    const document = await this.collection.doc(id).get();
    if (!document.exists) throw new Error('Document does not exist');

    return document.data() as UserExtras;
  },
  set: async function (id: string, document: Partial<UserExtras>) {
    await this.collection
      .doc(id)
      .set(document)
      .catch((e) => console.log(e));
  },
  update: async function (id: string, document: Partial<UserExtras>) {
    await this.collection
      .doc(id)
      .update(document)
      .catch((e) => console.log(e));
  },
};
