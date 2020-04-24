import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAnV5jYTdJrmsqer1HwqoKVugVsHgaU648',
  authDomain: 'sisfo-24e52.firebaseapp.com',
  databaseURL: 'https://sisfo-24e52.firebaseio.com',
  projectId: 'sisfo-24e52',
  storageBucket: 'sisfo-24e52.appspot.com',
  messagingSenderId: '296241373916',
  appId: '1:296241373916:web:43e3258aa7a35dc7b60a19',
  measurementId: 'G-B52TEB94VX'
};

const fire = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export {fire, storage};
