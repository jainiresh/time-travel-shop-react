import { combineReducers } from "@reduxjs/toolkit";
import devCycleReducer from "./devCycleReducer";
import loaderStateReducer from "./loaderStateReducer";

const { default: musicMetadataReducer } = require("./musicMetadata");

const rootReducer = combineReducers({
    musicMetadataReducer: musicMetadataReducer,
    devCycleReducer: devCycleReducer,
    loaderStateReducer: loaderStateReducer
})

export default rootReducer