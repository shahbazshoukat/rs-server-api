const board = require('./Board');
const result = require('./Result');
const section = require('./Section');
const user = require('./User');
const news = require('./News');
const dateSheets = require('./DateSheet');
const modelPapers = require('./ModelPaper');

module.exports = (app) => {

  app.use('/api/admin/', board);
  app.use('/api/admin/', result);
  app.use('/api/admin/', section);
  app.use('/api/admin/', user);
  app.use('/api/admin/', news);
  app.use('/api/admin/', dateSheets);
  app.use('/api/admin/', modelPapers);

};
