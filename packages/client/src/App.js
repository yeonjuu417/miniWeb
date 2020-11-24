import React from 'react';
import Header from './Header';
import MovieRankList from './MovieRankList';
import CurrentMovie from './CurrentMovie';

// 기본값으로 주어지는 영화 목록은 다음을 이용하세요.
import mockMovie from './mockMovie'

function App() {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <CurrentMovie />
        <MovieRankList movies={[]} />
      </div>
    </>
  );
}

export default App;
