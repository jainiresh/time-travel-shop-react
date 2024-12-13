import { all } from "redux-saga/effects";
import devCycleSaga from "./devCycleSaga";

export default function* rootSaga(){
    yield all([ devCycleSaga()]);
}