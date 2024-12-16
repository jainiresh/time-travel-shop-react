import axios from 'axios';
import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'

function* getMusicByYearApiCall(year) {
  // Generate a random number in the range [20, 25]
  const randomNumber = Math.floor(Math.random() * (25 - 20 + 1)) + 20;

  // Generate a random offset in the range [5, 10]
  const offset = Math.floor(Math.random() * (10 - 5 + 1)) + 5;



  const response = yield call(
    fetch,
    `https://musicbrainz.org/ws/2/recording?query=date:${year}&limit=${randomNumber}&offset=${offset}`,
    {
      headers: {
        'Accept': 'application/json',
      }
    }
  );

  const data = yield response.json();
  return data.recordings;
}


function* devcycleDataPopulator(action) {
  try {

    const year = action.payload;

    yield put({type:'TURN_ON_LOADING'});
    yield put({ type: 'SET_DEVCYCLE_DATA', payload: year });
    let musicData = yield call(getMusicByYearApiCall, year)

    const filteredData = yield Promise.all(musicData.map(async (music) => {
      try {
        const imageFirstStepData = await axios.get(`${process.env.REACT_APP_SERVER_URL}/proxy?id=${music.id}`);

        if(!imageFirstStepData){
          return {
            id: '404',
            title:'This song has no title, please refresh the page',
            artistDetails:{
              name:'Unknown artist'
            },
            imageUrl:'/noImage.png'
          }
        }
        const data = await imageFirstStepData.data;
        const { caa_id, caa_release_mbid } = (data.playlist.playlist.track[0].extension["https://musicbrainz.org/doc/jspf#track"].additional_metadata);

        const imageUrl = caa_id && caa_release_mbid ? `https://ia601404.us.archive.org/19/items/mbid-${caa_release_mbid}/mbid-${caa_release_mbid}-${caa_id}_thumb250.jpg` : undefined;

        return {
          id: music.id,
          title: music.title,
          artistDetails: {
            name: music["artist-credit"][0].name,
          },
          imageUrl,
        };
      } catch (error) {
        console.error('Error:', error);
      }
    }));


    yield put({ type: 'POPULATE_MUSIC_METADATA', payload: filteredData })
    yield put({type:'TURN_OFF_LOADING'});


  } catch (error) {
    console.log('Errored in devCycleSaga, in saga file : ', error)
  }
}


export default function* devCycleSaga() {
  yield takeLeading('POPULATE_DEVCYCLE_DATA_SAGA', devcycleDataPopulator);
}