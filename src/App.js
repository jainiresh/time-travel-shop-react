import { Provider } from 'react-redux';
import './App.css';
import Layout from './Layout';
import store from './store/store';
import ModernLoader from './components/Loaders/Modern/ModernLoader';
import OldLoader from './components/Loaders/Retro/RetroLoader';
import VintageLoader from './components/Loaders/Vintage/VintageLoader';
import RetroLoader from './components/Loaders/Retro/RetroLoader';
import { OpenFeatureProvider } from '@openfeature/react-sdk';

function App() {
  return (
   <>
   <Provider store={store}>
    <OpenFeatureProvider>
    <Layout />
    {/* <ModernLoader /> */}
    {/* <RetroLoader hidden={false} /> */}
    {/* <VintageLoader /> */}
    </OpenFeatureProvider>
    </Provider>
   </>
  );
}

export default App;
