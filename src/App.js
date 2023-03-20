import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import React from 'react';
import Layoutcontainer from './components/layout-container';
import CardCharacter from './components/Card/card';
import ListaEpisodes from './components/list-episodes';
import ListLocation from './components/list-localizacao';
import CardEpisodio from './components/Card/card-episode/index';
import CardLocalizacao from './components/Card/card-localizacao/index'
import Home from './pages/home';


function App() {
  return (
    //Rotas
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layoutcontainer />} />
        <Route path="characters">
          <Route path="" element={<Layoutcontainer />} />
          <Route path=":id" element={<CardCharacter />} />
        </Route >
        <Route path="episodes">
          <Route path="" element={<ListaEpisodes title="Episodios" />} />
          <Route path=":idEpisodio" element={<CardEpisodio />} />
        </Route>
        <Route path="location">
          <Route path="" element={<ListLocation title="Dimension" />} />
          <Route path=":id" element={<CardLocalizacao />} />
          <Route path=":idCharacter" element={<CardCharacter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
