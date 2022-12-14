import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import New from './components/New/New';
import Main from './containers/Main/Main';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={(
          <Main/>
        )}/>
        <Route path='/meal/new' element={(
          <New/>
        )}/>
        <Route path='/meal/:id/edit' element={(
          <New/>
        )}/>
      </Routes>
    </div>
  );
}

export default App;
