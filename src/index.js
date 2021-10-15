import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Database, } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'
import { mySchema } from './models/schema'
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'
import Draw from './models/Draw'

const adapter = new LokiJSAdapter({
  dbName: 'MatchDB',
  schema: mySchema,
  useWebWorker: false,
  useIncrementalIndexedDB: true
})

const database = new Database({
  adapter,
  modelClasses: [Draw],
  actionsEnabled: true,
})

ReactDOM.render(
  <DatabaseProvider database={database}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </DatabaseProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
