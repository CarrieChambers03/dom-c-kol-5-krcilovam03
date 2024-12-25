import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { SettingsContext } from './helpers/settingsContext.js';
import Detail from './pages/detail.jsx';
import Menu from './pages/menu.jsx';
import Dashboard from './pages/dashboard.jsx';


const users = [
  {
    "id": "a",
    "name": "Alice"
  },
  {
    "id": "b",
    "name": "Bob"
  },
  {
    "id": "c",
    "name": "Charlie"
  }
]

function App() {
  const [settings, setSettings] = React.useState({
    userId: "a"
  });

  return (
    <Router>
      <SettingsContext.Provider value={settings}>
        <Routes>
          <Route path='*' element={ <h1>404 Page not Found</h1> } />
          <Route path="/" element={ <Menu users={users} onUserIdChange={(id) => {setSettings({...settings, userId: id})}} /> } />
          <Route path='/detail/:id' element={ <Detail users={users} /> } />
          <Route path='/home' element={ <Dashboard users={users} /> } />
        </Routes>
      </SettingsContext.Provider>
    </Router>
  );
}

export default App;
