import {all, fork} from 'redux-saga/effects'
import loginRootSaga from 'app/auth/store/sagas'

export default function* rootSaga()
{
    yield all([
        fork(loginRootSaga)
    ])
}