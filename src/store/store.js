import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "../sagas";
import rootReducer from "./reducers";
import loggerMiddleware from "../middlewares/loggerMiddleware";
const { default: createSagaMiddleware } = require("@redux-saga/core");



const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            thunk:false,
            serializeCallback: false
        }).concat(sagaMiddleware).concat(loggerMiddleware)
})


sagaMiddleware.run(rootSaga);

export default store;