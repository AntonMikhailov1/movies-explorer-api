const allowList = [
  'http://api.movie-search.nomoredomainsrocks.ru',
  'http://api.movie-search.nomoredomainsrocks.ru/',
  'https://api.movie-search.nomoredomainsrocks.ru',
  'https://api.movie-search.nomoredomainsrocks.ru/',
  'http://158.160.55.170',
  'https://158.160.55.170',
  'http://localhost:3000/',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://movie-search.nomoredomainsmonster.ru',
  'https://movie-search.nomoredomainsmonster.ru',
];

const allowMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (allowList.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
  return next();
};
