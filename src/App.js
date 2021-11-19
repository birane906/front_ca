import React from 'react';
import './App.scss'
import AppRouter from './router/index';
import store from './store/store';
import { Provider } from 'react-redux';

const App = () => {
    return (
        <div className="App">
            <Provider store={store}>
                <AppRouter></AppRouter>
            </Provider>
        </div>
    );
};

export default App;
