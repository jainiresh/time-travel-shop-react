import { useDispatch, useSelector } from 'react-redux';
import VintagePage from './components/Vintage/VintagePage';
import { OpenFeature, useStringFlagValue } from '@openfeature/react-sdk';
import DevCycleProvider from '@devcycle/openfeature-web-provider';
import ModernPage from './components/Modern/ModernPage';
import RetroPage from './components/Retro/RetroPage';
import './Layout.css';
import ModernLoader from './components/Loaders/Modern/ModernLoader';
import Admin from './components/Admin/admin';

const user = { user_id: 'user_id' }; 
const devcycleProvider = new DevCycleProvider(process.env.REACT_APP_DEVCYCLE_SDK_CLIENT_KEY, {});
async function setupOpenFeature() {
  await OpenFeature.setContext(user);
  await OpenFeature.setProviderAndWait(devcycleProvider);
}
setupOpenFeature();

function Layout() {
  const dispatch = useDispatch();
  const adminPageReducer = useSelector(state => state.adminPageReducer)

  const year = useStringFlagValue('time-machine', '2025');
  console.log('Current year ', year)

  if (year == 2025) {
    return <ModernLoader hidden={false} />;
  }
  
  if(!adminPageReducer.isAdminPage)  
  dispatch({ type: 'POPULATE_DEVCYCLE_DATA_SAGA', payload: year });
 


  let isVintage = year <= 1980;
  let isRetro = year <= 2010 && !isVintage;

  const RestOfTheApp = isVintage ? <VintagePage /> : isRetro ? <RetroPage /> : <ModernPage />;

  const minYear = 1950;
  const maxYear = 2024;
  let progressPercentage = ((year - minYear) / (maxYear - minYear)) * 100;

  progressPercentage = year > 2020 ? progressPercentage - 2.7 : progressPercentage;
  progressPercentage = year < 1955 ? progressPercentage + 2.7 : progressPercentage;
  
  const handleTimeTravel = () => {
    dispatch({type:'TRAVEL_TO_ADMIN_PAGE'})
  }
  if(adminPageReducer.isAdminPage)
      return <Admin />


  return (
      <div className="parentContainer">
        {Array.from({ length: 100 }).map((_, index) => (
          <div key={index} className="star"></div>
        ))}

        <div className="timelineWrapper">
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '0.1rem',
              alignmentBaseline: 'central',
              width: '100%',
            }}
          >
            <span style={{ fontSize: '1rem', color: 'white', fontWeight: 'bolder' }}>{minYear}</span>
            <div className="timeline"></div>
            <div className="currentYearLabel" style={{ left: `${progressPercentage}%` }}>
              <div className="arrow"></div>
              <span>You're here in time at :</span>
              <span style={{ color: 'whitesmoke', fontSize: '1rem' }}>{year}</span>
            </div>
            <span style={{ fontSize: '1rem', color: 'white', fontWeight: 'bolder' }}>{maxYear}</span>
            
          </div>
          <div 
  style={{ height: '0.5rem', cursor: 'pointer' }}
  className="time-travel-container"
  onClick={() => handleTimeTravel()}
>
  <p className="time-travel-text">
    Time travel 🛸
  </p>
</div>
        </div>
        {RestOfTheApp}
      </div>
  );
}

export default Layout;
