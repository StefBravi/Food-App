import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render( //renderiza el contenido de la app en el dom

<Provider store={store}> {/*el Provider conecta al store con la app de React*/}
  <BrowserRouter> {/*ermite definir y gestionar las rutas en la app */} 
   <App /> {/*gracias a BrowseRouter ahora app puede definir rutas*/}
  </BrowserRouter>,
</Provider>, 

document.getElementById('root') //html con id root. Es done se realiza render de React
);

