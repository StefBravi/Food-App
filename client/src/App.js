import { Detail, Form, Home, Landing} from './views'
import { Route, useLocation } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar'
import './App.css';

function App() {
  const location = useLocation() //ubicacion actual de la app, es decir en que url esta
  
  // aca definimos las rutas
  return (  
    <div className="App">
      {location.pathname !=="/" && <NavBar />}
      <Route exact path="/detail/:idRecipe" component={Detail} />         
      <Route path="/create" render={() => <Form /> } />        
      <Route path="/home" render={() => <Home /> } />
      <Route exact path="/" render={() => <Landing /> } />        
    </div>
  );
}

export default App;
