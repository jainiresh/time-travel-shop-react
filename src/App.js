import { Provider } from 'react-redux';
import './App.css';
import Layout from './Layout';
import store from './store/store';
import ModernLoader from './components/Loaders/Modern/ModernLoader';
import OldLoader from './components/Loaders/Retro/RetroLoader';
import VintageLoader from './components/Loaders/Vintage/VintageLoader';
import RetroLoader from './components/Loaders/Retro/RetroLoader';

function App() {
  return (
   <>
   <Provider store={store}>
    <Layout />
    {/* <ModernLoader /> */}
    {/* <RetroLoader hidden={false} /> */}
    {/* <VintageLoader /> */}
    </Provider>
   </>
  );
}

export default App;
