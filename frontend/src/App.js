import './App.css';
import React, {useEffect, useState} from 'react';

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div className="App">
      {(typeof data.users === 'undefined') ? (
        <div>loading...</div>
      ) : (
        data.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}
    </div>
  );
}

export default App;
