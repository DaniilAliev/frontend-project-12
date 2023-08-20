import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './slices/store';
import initialization from './init';

const app = () => {
  const init = initialization();

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store} >
        {init} 
      </Provider>
    </React.StrictMode>
  );
}

app();