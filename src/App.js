import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/views/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login/>}></Route>
        </Routes>
      </BrowserRouter> 
    </div>
  );
};

export default App;