import React, { useState, useEffect } from 'react';
import './App.css';

async function fetchData(set) {
  const response = await fetch("/users");
  const json = await response.json();
  set(json);
}

function App() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    fetchData(setUser);
  }, []);
  return (
    <div className="App">
      <ul>
      {users.map(user => (
        <li key={user.id}>{user.username}</li>))}
      </ul>
    </div>
  );
}

export default App;
