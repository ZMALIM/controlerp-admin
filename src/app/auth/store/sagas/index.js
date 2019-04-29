import {all, call, put, take, takeEvery, takeLatest} from 'redux-saga/effects'
import fs from 'app/services/firebaseService';
import * as Actions from '../actions'

function* login({payload}){
    const {username, password} = payload 
    try {
        // const data = yield call(fs.authRSF.signInWithEmailAndPassword, email, password)
        console.log("USUARIO: " + username + " PASS: " + password);
        
    } catch (e) {
        console.log(e);
    }
}

export default function* loginRootSaga(){
    yield all([
        takeEvery('LOGIN', login)
    ])
}