import React from 'react';
import './App.css';
import RandomUser from './user/user';

function App() {
  return (
    <div>
      <header>
      </header>
      <body>
        <h1>Salt employee card</h1>
        <RandomUser count={1}/>
      </body>
    </div>
  );
}

export default App;
