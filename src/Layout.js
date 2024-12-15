import VintagePage from './components/Vintage/VintagePage';
import { useDispatch } from 'react-redux';
import { useIsDevCycleInitialized, useVariableValue, withDevCycleProvider } from '@devcycle/react-client-sdk';
import ModernPage from './components/Modern/ModernPage';
import RetroPage from './components/Retro/RetroPage';
function Layout() {
  const isDevCycleInitialized = useIsDevCycleInitialized();
  const dispatch = useDispatch();
 
  // const year = useVariableValue('time-machine', '1900');
  const year = 2024;
  dispatch({type:'POPULATE_DEVCYCLE_DATA_SAGA', payload:year});

  console.log('The devcycle values is ')
  console.log(year)
  
  const RestOfTheApp = !isDevCycleInitialized ? <>Loading...</> : year <= 1980 ? <VintagePage /> : year <= 2010 ? <RetroPage/> : <ModernPage />;
  // const RestOfTheApp = <VintagePage />
  

  return (
   <>
    {RestOfTheApp}
   </>
  );
}

export default withDevCycleProvider({sdkKey: 'dvc_client_95e52678_6b07_4b43_b1a0_01c8a33fb55b_7558482'})( Layout);
