const initialState = {
    year: 0
};

const devCycleReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_DEVCYCLE_DATA':
            return {year : action.payload}
        default:
            return state;
    }
}

export default devCycleReducer