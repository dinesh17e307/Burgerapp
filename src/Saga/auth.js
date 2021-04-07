import * as actionTypes from '../Store/actions/actionTypes'
import {put} from 'react-saga/effects'

export function sagalogout(){

    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");

    put({
        type: actionTypes.AUTH_LOGOUT,
    })
}