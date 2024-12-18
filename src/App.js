import { Provider } from 'react-redux';
import './App.css';
import Layout from './Layout';
import store from './store/store';
import ModernLoader from './components/Loaders/Modern/ModernLoader';
import OldLoader from './components/Loaders/Retro/RetroLoader';
import VintageLoader from './components/Loaders/Vintage/VintageLoader';
import RetroLoader from './components/Loaders/Retro/RetroLoader';
import { OpenFeatureProvider } from '@openfeature/react-sdk';
import Admin from './components/Admin/admin';

function App() {
  return (
   <>
   <Provider store={store}>
    <Admin></Admin>
    </Provider>
   </>
  );
}

export default App;
