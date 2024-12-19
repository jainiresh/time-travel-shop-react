import axios from "axios";
import { call, delay, put, takeLatest } from "redux-saga/effects";

function* updateFeatureFlagDevCycleApi(year) {
    try {
        yield axios.get(`${process.env.REACT_APP_SERVER_URL}/updateFeature?year=${year}`)
    } catch (error) {
        console.error('Error in updateFeatureFlagDevCycleApi:', error.message);
        throw error;
    }
}


function* timeTravelFromAdminPageSaga(action){
    
    yield call(updateFeatureFlagDevCycleApi, action.payload);
    yield delay(3000);
    const year = action.payload;
  
    yield put ({ type: 'POPULATE_DEVCYCLE_DATA_SAGA', payload: year });
    yield put({type:'TRAVEL_OUT_FROM_ADMIN_PAGE'});
}

export default function* adminPageSaga(){
    yield takeLatest('TIME_TRAVEL_FROM_ADMIN_PAGE_SAGA', timeTravelFromAdminPageSaga);
}