import { Provider } from 'react-redux';
import './App.css';
import Layout from './Layout';
import store from './store/store';
import { OpenFeatureProvider } from '@openfeature/react-sdk';

function App() {
  return (
   <>
   <Provider store={store}>
    <OpenFeatureProvider>
    <Layout />
    </OpenFeatureProvider>
    </Provider>
   </>
  );
}

export default App;
