import { combineReducers } from "@reduxjs/toolkit";
import devCycleReducer from "./devCycleReducer";

const { default: musicMetadataReducer } = require("./musicMetadata");

const rootReducer = combineReducers({
    musicMetadataReducer: musicMetadataReducer,
    devCycleReducer: devCycleReducer
})

export default rootReducer