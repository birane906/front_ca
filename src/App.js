import React from 'react';
import './App.scss'
import AppRouter from './router/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';

const App = () => {
    return (
        <div className="App">
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AppRouter></AppRouter>
                </PersistGate>
            </Provider>
        </div>
    );
};

export default App;
