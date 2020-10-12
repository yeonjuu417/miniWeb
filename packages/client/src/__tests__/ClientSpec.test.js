import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils'; // ES6
import fetch from 'node-fetch';
import MovieRankListEntry from '../MovieRankListEntry';
import MovieRankList from '../MovieRankList';
import CurrentMovie from '../CurrentMovie';
import App from '../App';
import { movies } from './fakeData.json';

global.fetch = fetch;

const mockMovie = [
  {
    id: 5512,
    url: 'https://yts.lt/movie/deadpool-2016',
    title: 'Deadpool',
    year: 2016,
    rating: 8.6,
    runtime: 108,
    genres: ['Action', 'Adventure', 'Comedy', 'Romance', 'Sci-Fi'],
    summary:
      'This is the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.',
    description_full:
      'This is the origin story of former Special Forces operative turned mercenary Wade Wilson, who after being subjected to a rogue experiment that leaves him with accelerated healing powers, adopts the alter ego Deadpool. Armed with his new abilities and a dark, twisted sense of humor, Deadpool hunts down the man who nearly destroyed his life.',
    small_cover_image:
      'https://yts.lt/assets/images/movies/deadpool_2016/small-cover.jpg',
    medium_cover_image:
      'https://yts.lt/assets/images/movies/deadpool_2016/medium-cover.jpg',
    large_cover_image:
      'https://yts.lt/assets/images/movies/deadpool_2016/large-cover.jpg',
  },
  {
    id: 1267,
    url: 'https://yts.lt/movie/furious-7-2015',
    title: 'Furious 7',
    year: 2015,
    rating: 7.2,
    runtime: 137,
    genres: ['Action', 'Adventure', 'Crime', 'Thriller'],
    summary:
      "Dominic and his crew thought they'd left the criminal mercenary life behind. They'd defeated international terrorist Owen Shaw and went their separate ways. But now, Shaw's brother, Deckard Shaw, is out killing the crew one by one for revenge. Worse, a Somalian terrorist called Jakarde and a shady government official called \"Mr. Nobody\" are both competing to steal a computer terrorism program called \"God's Eye,\" that can turn any technological device into a weapon. Torretto must reconvene with his team to stop Shaw and retrieve the God's Eye program while caught in a power struggle between the terrorist and the United States government.",
    description_full:
      "Dominic and his crew thought they'd left the criminal mercenary life behind. They'd defeated international terrorist Owen Shaw and went their separate ways. But now, Shaw's brother, Deckard Shaw, is out killing the crew one by one for revenge. Worse, a Somalian terrorist called Jakarde and a shady government official called \"Mr. Nobody\" are both competing to steal a computer terrorism program called \"God's Eye,\" that can turn any technological device into a weapon. Torretto must reconvene with his team to stop Shaw and retrieve the God's Eye program while caught in a power struggle between the terrorist and the United States government.",
    small_cover_image:
      'https://yts.lt/assets/images/movies/furious_seven_2015/small-cover.jpg',
    medium_cover_image:
      'https://yts.lt/assets/images/movies/furious_seven_2015/medium-cover.jpg',
    large_cover_image:
      'https://yts.lt/assets/images/movies/furious_seven_2015/large-cover.jpg',
  },
];

describe('MovieRankListEntry test', () => {
  let container;
  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<MovieRankListEntry movie={mockMovie[0]} />, container);
    });
  });

  afterAll(() => {
    document.body.removeChild(container);
    container = null;
  });

  test('동적 렌더링을 통해 영화의 제목을 표현해야 합니다.', () => {
    expect(container.querySelector('.title').innerHTML).toEqual(
      mockMovie[0].title
    );
  });
  test('동적 렌더링을 통해 영화의 평점을 표현해야 합니다.', () => {
    expect(
      container
        .querySelector('.rating')
        .innerHTML.includes(mockMovie[0].rating.toString())
    ).toEqual(true);
  });
  test('동적 렌더링을 통해 영화의 러닝 타임을 표현해야 합니다.', () => {
    expect(
      container
        .querySelector('.running-time')
        .innerHTML.includes(mockMovie[0].runtime.toString())
    ).toEqual(true);
  });
  test('동적 렌더링을 통해 영화의 장르들을 표현해야 합니다.', () => {
    expect(container.querySelectorAll('.tag').length).toEqual(
      mockMovie[0].genres.length
    );
  });
  test('유니크한 genre를 key로 지정하여 genres.map을 실행해야 합니다.', async function () {
    const cards = container.querySelectorAll('.tag');

    for (let i = 0; i < Object.keys(cards).length; i++) {
      let genre;
      cards[i].addEventListener('mouseover', (e) => {
        genre = e.target[Object.keys(e.target)[0]].key;
      });

      cards[i].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

      expect(genre).toEqual(mockMovie[0].genres[i].toString());
    }
  });
});

describe('MovieRankList test', () => {
  let container;
  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      ReactDOM.render(<MovieRankList movies={[]} />, container);
    });
  });

  afterAll(() => {
    document.body.removeChild(container);
    container = null;
  });
  test('props로 빈 배열을 받은 경우, MovieRankListEntry가 존재하면 안됩니다.', () => {
    expect(container.querySelectorAll('.card').length).toEqual(0);
  });
  test('props로 빈 배열을 받은 경우, 리스트 대신 `영화 목록이 비었습니다` 라는 문구를 표시해야 합니다.', () => {
    expect(
      container
        .querySelector('.right-movie-list')
        .innerHTML.includes('영화 목록이 비었습니다')
    ).toEqual(true);
  });
  test('props에 담긴 영화정보의 갯수 만큼 MovieRankListEntry를 렌더링해야 합니다.', () => {
    act(() => {
      ReactDOM.render(<MovieRankList movies={mockMovie} />, container);
    });
    expect(container.querySelectorAll('.card').length).toEqual(2);
  });
  test('MovieRankListEntry를 여러개 출력할 때, 고유의 key를 가지고 있어야 합니다.', () => {
    act(() => {
      ReactDOM.render(<MovieRankList movies={mockMovie} />, container);
    });

    const cards = container.querySelectorAll('.card');

    for (let i = 0; i < Object.keys(cards).length; i++) {
      let id;
      cards[i].addEventListener('mouseover', (e) => {
        id = e.target[Object.keys(e.target)[0]].return.key;
      });

      cards[i].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

      expect(id).toEqual(mockMovie[i].id.toString());
    }
  });
});

describe('CurrentMovie test', () => {
  let container;
  beforeAll(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<CurrentMovie movie={mockMovie[0]} />, container);
    });
  });

  afterAll(() => {
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  test('동적 렌더링을 통해 현재 영화의 제목을 표현해야 합니다.', () => {
    expect(container.querySelector('.title').innerHTML).toEqual(
      mockMovie[0].title
    );
  });
  test('동적 렌더링을 통해 현재 영화의 포스터(medium 사이즈)를 표현해야 합니다.', () => {
    expect(container.querySelector('img').src).toEqual(
      mockMovie[0].medium_cover_image
    );
  });
  test('동적 렌더링을 통해 현재 영화의 평점을 표현해야 합니다.', () => {
    expect(
      container
        .querySelector('.rating')
        .innerHTML.includes(mockMovie[0].rating.toString())
    ).toEqual(true);
  });
  test('동적 렌더링을 통해 현재 영화의 러닝 타임을 표현해야 합니다.', () => {
    expect(
      container
        .querySelector('.running-time')
        .innerHTML.includes(mockMovie[0].runtime.toString())
    ).toEqual(true);
  });
  test('동적 렌더링을 통해 현재 영화의 설명을 표현해야 합니다.', () => {
    expect(container.querySelector('.description').innerHTML).toEqual(
      mockMovie[0].description_full
    );
  });

  test('영화 정보를 넘기지 않으면, `영화를 선택하세요`라는 메시지를 표시해야 합니다.', () => {
    act(() => {
      ReactDOM.render(<CurrentMovie movie={null} />, container);
    });

    expect(container.innerHTML.includes('영화를 선택하세요')).toEqual(true);
  });
  test('아무런 영화 정보를 넘기지 않아도 렌더링할 때에 문제가 없어야 합니다.', () => {
    expect(() => {
      ReactDOM.render(<CurrentMovie movie={null} />, container);
    }).not.toThrow();
  });
});

describe('App test', () => {
  let container;
  let spy;
  let mountSpy;
  let mockApp;

  beforeAll(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);

    mockApp = new App();

    spy = jest.spyOn(App.prototype, 'handleCardClick');
    mountSpy = jest.spyOn(global, 'fetch');

    mountSpy.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(movies),
      })
    );

    await act(async () => {
      ReactDOM.render(<App />, container);
    });
  });
  afterAll(() => {
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
    jest.clearAllMocks();
  });
  test('클래스 컴포넌트여야 합니다.', () => {
    expect(!!App.prototype.isReactComponent).toBeTruthy();
  });

  test('현재 영화정보를 바꾸기 위한 `handleCardClick`메서드가 존재해야 합니다.', () => {
    expect(typeof mockApp.handleCardClick).toEqual('function');
  });

  test('handleCardClick 메서드를 실행하면 `setState` 함수가 실행되어야 합니다.', () => {
    const stateSpy = jest.spyOn(App.prototype, 'setState');
    const cards = container.querySelectorAll('.card');
    cards[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(stateSpy).toBeCalledTimes(1);

    stateSpy.mockClear();
    spy.mockClear();
  });

  test('App 컴포넌트는 현재 영화 정보(currentMovie)와 영화 리스트(movies)를 `state`로 가지고 있어야 합니다.', () => {
    expect(mockApp.state.currentMovie).not.toEqual(undefined);
    expect(mockApp.state.movies).not.toEqual(undefined);
  });

  test('영화 목록을 클릭할 때에, `handleCardClick` 메서드를 이용해서 현재 영화정보를 업데이트해야 합니다.', () => {
    const cards = container.querySelectorAll('.card');
    cards[2].dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(container.querySelector('.current-movie .title').innerHTML).toEqual(
      movies[2].title
    );

    expect(
      container.querySelector('.current-movie .title').innerHTML
    ).not.toEqual(movies[0].title);

    expect(spy).toBeCalledTimes(1);

    spy.mockClear();
  });

  test('fetch를 통해 서버로부터 정보를 받아오는 과정이 있어야 합니다.', () => {
    expect(mountSpy).toBeCalledTimes(1);
    mountSpy.mockClear();
  });
});
