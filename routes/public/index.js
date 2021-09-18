const board = require('./Board');
const result = require('./Result');
const section = require('./Section');
const dateSheets = require('./DateSheet');
const modelPapers = require('./ModelPaper');

module.exports = (app) => {

  app.use('/api/', board);
  app.use('/api/', result);
  app.use('/api/', section);
  app.use('/api/', dateSheets);
  app.use('/api/', modelPapers);

};
