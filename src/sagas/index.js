import { all } from "redux-saga/effects";
import devCycleSaga from "./devCycleSaga";
import adminPageSaga from "./adminPageSaga";

export default function* rootSaga(){
    yield all([ devCycleSaga(), adminPageSaga()]);
}