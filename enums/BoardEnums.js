const BoardEnums = Object.freeze({
  EXAM_TYPES: {
    ANNUAL: 0,
    SUPPLY: 1,
    TEST: 2,
    RETOTAL: 3
  },
  API_MODE: {
    API: 0,
    SCRAPING: 1,
    URL: 2
  },
  REQUEST_TYPE: {
    POST: 0,
    GET: 1
  }
});

module.exports = BoardEnums;
