import config from './firebaseServiceConfig';
import ReduxSagaFirebase from 'redux-saga-firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';

class firebaseService {
    constructor(){
        if(firebase.apps.length)
        {
            return;
        }
        /**
         * inicializar @Firebase
         */
        this.app = firebase.initializeApp(config);
        /**
         * inicicializat @RSF
         */
        this.rsf =  new ReduxSagaFirebase(this.app)
        /**
         * @servicios de firebase
         */
        this.db = firebase.database();
        this.auth = firebase.auth();
        this.firestore = firebase.firestore();
        this.fieldValue = firebase.firestore.FieldValue;
        this.emailAuthPorvider = firebase.auth.EmailAuthProvider;

        /**
         * Inicializar @ReduxSagaFirebase
         */
        this.authRSF = this.rsf.auth;
        this.firestoreRSF = this.rsf.firestore;

        /**
         * @Autenticación
         * @RedesSociales
         */
        this.googleProvider = new firebase.auth.GoogleAuthProvider();
        this.fbProvider = new firebase.auth.FacebookAuthProvider();
        this.twitterProvider = new firebase.auth.TwitterAuthProvider();
    }

    init()
    {
    }

    contacts = () => this.firestore.collection('contacts');
    contact = id => this.firestore.doc(`contacts/${id}`);

    getUserData = (userId) => {
        if ( !firebase.apps.length )
        {
            return;
        }
        return new Promise((resolve, reject) => {
            this.db.ref(`users/${userId}`)
                .once('value')
                .then((snapshot) => {
                    const user = snapshot.val();
                    resolve(user);
                });
        });
    };

    updateUserData = (user) => {
        if ( !firebase.apps.length )
        {
            return;
        }
        return this.db.ref(`users/${user.uid}`)
            .set(user);
    };

    onAuthStateChanged = (callback) => {
        if ( !this.auth )
        {
            return;
        }
        this.auth.onAuthStateChanged(callback);
    };

    signOut = () => {
        if ( !this.auth )
        {
            return;
        }
        this.auth.signOut();
    }
}

export default new firebaseService();;
