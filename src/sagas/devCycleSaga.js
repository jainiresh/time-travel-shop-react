import axios from 'axios';
import { call, put, takeLatest, takeLeading } from 'redux-saga/effects'

function* getMusicByYearApiCall(year) {
  const randomNumber = 20;
  // Math.floor(Math.random() * (100 - 10 + 1)) + 10;

  console.log('random Number ', randomNumber)
  const response = yield call(fetch, `https://musicbrainz.org/ws/2/recording?query=date:${year}&limit=${randomNumber}`, {
    headers: {
      'Accept': 'application/json'
    }
  });
  const data = yield response.json();
  console.log('Api response');
  return data.recordings;

}

function* devcycleDataPopulator(action) {
  try {
    console.log('Incoming payload ');
    const year = action.payload;
    console.log(year);

    yield put({type:'TURN_ON_LOADING'});
    yield put({ type: 'SET_DEVCYCLE_DATA', payload: year });
    let musicData = yield call(getMusicByYearApiCall, year)

    const filteredData = yield Promise.all(musicData.map(async (music) => {
      try {
        const imageFirstStepData = await axios.get(`http://localhost:3001/proxy?id=${music.id}`);

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


    console.log('Fetched music data ', musicData)
    console.log('Filtered dataa :', filteredData)
    yield put({ type: 'POPULATE_MUSIC_METADATA', payload: filteredData })
    yield put({type:'TURN_OFF_LOADING'});


  } catch (error) {
    console.log('Errored in devCycleSaga, in saga file : ', error)
  }
}


export default function* devCycleSaga() {
  yield takeLeading('POPULATE_DEVCYCLE_DATA_SAGA', devcycleDataPopulator);
}