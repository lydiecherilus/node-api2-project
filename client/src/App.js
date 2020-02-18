import React from 'react';
import './App.css';
import PostsList from './components/PostsList';

function App() {
  return (
    <div className="App">
      <h1>Guess who said this!</h1>
      <PostsList />
    </div>
  );
}
export default App;
