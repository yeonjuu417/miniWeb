const express = require('express');
const { movies } = require('./data.json');

const app = express();

// TODO : 영화 API 를 위한 server를 작성하세요. server spec은 server directory test spec을 참고 해주세요.
// TODO : 데이터는 data.json 파일을 활용 하세요.

// 테스트를 위한 코드입니다. 건드리지 마세요.
if (process.env.NODE_ENV !== 'test') {
  app.listen(3000, () => {
    console.log('server listen on 3000');
  });
}

module.exports = app;
