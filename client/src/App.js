import './App.css';
import React from "react";
import { Route } from 'react-router-dom';
import LandingPage  from "./LandingPage/LandingPage.jsx";
import Home from "./Home/Home";
import PokemonCreate from "./PokemonCreate/PokemonCreate";
import Details from "./Detail/Detail";
// import NotFoundPage from "./NotFoundPage/NotFoundPage";

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route exact path="/Pokemons" component={Home} />
      <Route exact path="/create" component={PokemonCreate} />
      <Route exact path="/Pokemons/:id" component={Details} /> 
       {/* <Route path="*" component={NotFoundPage} />  */}
      </div>
   );
}
export default App;