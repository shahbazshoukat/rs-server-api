const News = require('./news');

class NewsHandler {

  static createNews (data) {

    const news = new News({
      link: data.link,
      description: data.description,
      board: data.boardId,
      province: data.province
    });

    return news.save();

  }

  static getNewsById (newsId) {

    const q = { _id: newsId };

    return News.findOne(q).lean().exec();

  }

  static getAllNews () {

    const select = '-createdAt -updatedAt';

    return News.find().select(select).lean().exec();

  }

  static updateNews (newsId, data) {

    const q = { _id: newsId };

    const update = {
      link: data.link,
      description: data.description
    };

    return News.updateOne(q, update);

  }

  static deleteNews (newsId) {

    const q = { _id: newsId };

    return News.deleteOne(q);

  }

}

module.exports = NewsHandler;
