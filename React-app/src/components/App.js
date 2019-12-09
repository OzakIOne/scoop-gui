import React from 'react';
import Bucketcol from './bucketscolumn'
import Contentcol from './contentcolumn'
import '../scss/bin/css/style.min.css'

function App() {
  return (
    <div className="App app-container flex--row">
      <Bucketcol />
      <Contentcol />
    </div>
  );
}

export default App;
