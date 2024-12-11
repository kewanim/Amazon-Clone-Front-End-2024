import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { DataProvide } from './Components/Data Provider/DataProvide';
import {initialState, reducer} from './Utility/reducer'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvide reducer={reducer} initialState={initialState}>
    <App />
    </DataProvide>
  </React.StrictMode>
);

