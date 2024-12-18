import { combineReducers } from "@reduxjs/toolkit";
import devCycleReducer from "./devCycleReducer";
import loaderStateReducer from "./loaderStateReducer";
import adminPageReducer from "./adminPageReducer";

const { default: musicMetadataReducer } = require("./musicMetadata");

const rootReducer = combineReducers({
    musicMetadataReducer: musicMetadataReducer,
    devCycleReducer: devCycleReducer,
    loaderStateReducer: loaderStateReducer,
    adminPageReducer: adminPageReducer
})

export default rootReducer