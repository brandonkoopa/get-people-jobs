import React from 'react';
import Header from './Header';
import PlayArea from './PlayArea';

const App = props => {
  return <div className="page">
    <div className="content">
      <Header/>
      <PlayArea/>
    </div>
  </div>;
}

export default App;