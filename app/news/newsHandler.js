const News = require('./news');

class NewsHandler {

  static createNews (data) {

    const news = new News({
      title: data.title,
      link: data.link,
      description: data.description
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
      title: data.title,
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
