const initialState = [{
    id:'',
    title: '',
    artistDetails:{
        name:''
    },
    imageUrl: ''
}]

const musicMetadataReducer = (state = initialState, action) => {
    switch(action.type){
        case 'POPULATE_MUSIC_METADATA': {
            return action.payload;
        }
        default:
            return state;
    }
}

export default musicMetadataReducer;