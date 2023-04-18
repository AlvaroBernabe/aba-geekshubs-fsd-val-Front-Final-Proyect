import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import {Provider} from 'react-redux';
import store from './app/store';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'


const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
              <Router />
          </BrowserRouter>
      </PersistGate>
  </Provider>
</React.StrictMode>,
)
