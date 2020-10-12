import React from 'react';
import MovieRankListEntry from './MovieRankListEntry';
export default function MovieRankList() {
  return (
    <div className="right-movie-list">
      <MovieRankListEntry />
      <MovieRankListEntry />
      <MovieRankListEntry />
      <MovieRankListEntry />
    </div>
  );
}