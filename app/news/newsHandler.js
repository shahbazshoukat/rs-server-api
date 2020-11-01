const News = require('./news');

class NewsHandler {

  static createNews (data) {

    const news = new News({
      title: data.title,
      description: data.description
    });

    return news.save();

  }

  static getNews (newsId) {

    const q = { _id: newsId };

    return News.find(q).lean().exec();

  }

  static getAllNews () {

    return News.find().lean().exec();

  }

  static updateNews (newsId, data) {

    const q = { _id: newsId };

    const update = {
      title: data.title,
      type: data.type
    };

    return News.updateOne(q, update);

  }

  static deleteNews (newsId) {

    const q = { _id: newsId };

    return News.deleteOne(q);

  }

}

module.exports = NewsHandler;
