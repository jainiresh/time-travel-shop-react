import { Provider } from 'react-redux';
import './App.css';
import Layout from './Layout';
import store from './store/store';
import ModernLoader from './components/Loaders/Modern/ModernLoader';
import OldLoader from './components/Loaders/Retro/RetroLoader';
import VintageLoader from './components/Loaders/Vintage/VintageLoader';
import RetroLoader from './components/Loaders/Retro/RetroLoader';
import { OpenFeatureProvider } from '@openfeature/react-sdk';
import AdminSlider from './components/Admin/AdminSlider';
import Admin from './components/Admin/admin';
import { DevCycleProvider, withDevCycleProvider } from '@devcycle/react-client-sdk';

function App() {
  return (
   <>
   <Provider store={store}>
    {/* <DevCycleProvider> */}
    <Layout />
    {/* <ModernLoader /> */}
    {/* <RetroLoader hidden={false} /> */}
    {/* <VintageLoader /> */}
    {/* <Admin /> */}
    {/* </DevCycleProvider> */}
    </Provider>
   </>
  );
}

export default withDevCycleProvider({
  sdkKey: 'dvc_client_95e52678_6b07_4b43_b1a0_01c8a33fb55b_7558482',
  options: {}
}) (App);
