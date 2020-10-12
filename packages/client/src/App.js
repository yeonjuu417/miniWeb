import React from 'react';
import Header from './Header';
import MovieRankList from './MovieRankList';
import CurrentMovie from './CurrentMovie';

function App() {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <CurrentMovie />
        <MovieRankList />
      </div>
    </>
  );
}

export default App;
