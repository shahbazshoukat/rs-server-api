const Board = require('./board');

class BoardHandler {

  static createBoard (data) {

    const board = new Board({
      key: data.key,
      title: data.title,
      description: data.description,
      province: data.province,
      city: data.city,
      examTypes: data.examTypes,
      sections: data.sections,
      type: data.type,
      webUrl: data.webUrl,
      resultUrl: data.resultUrl,
      tags: data.tags,
      isBlocked: data.isBlocked,
      domain: data.domain
    });

    return board.save();

  }

  static getBoard (boardId) {

    const q = { _id: boardId, deleted: false };

    return Board.findOne(q).populate('sections').populate('comments').lean()
      .exec();

  }

  static getBoardByKey (boardKey) {

    const q = { key: boardKey, deleted: false };

    return Board.findOne(q).populate('sections').populate('comments').lean()
      .exec();

  }

  static getBoardByDomain (domain) {

    const q = { domain, deleted: false };

    return Board.findOne(q).populate('sections').populate('comments').lean()
      .exec();

  }

  static getAllBoards () {

    return Board.find({ deleted: false }).select('-deleted -boardDir -modelPapersDir -pastPapersDir -dateSheetDir').populate('sections')
      .sort({ createdAt: 1 })
      .lean()
      .exec();

  }

  static getBoardsBySectionId (sectionId, allData = false) {

    const q = { sections: sectionId, deleted: false };

    if (allData) {

      return Board.find(q).lean().exec();

    }

    return Board.find(q).select('title province city resultUrl type domain').lean().exec();

  }

  static getBoardByProvince (province) {

    const q = { province, deleted: false };

    return Board.find(q).select('title description domain').lean().exec();

  }

  static updateBoardById (boardId, update) {

    const q = { _id: boardId };

    return Board.updateOne(q, update);

  }

  static updateBoard (boardId, data) {

    const q = { _id: boardId };

    const update = {
      key: data.key,
      title: data.title,
      description: data.description,
      province: data.province,
      city: data.city,
      examTypes: data.examTypes,
      sections: data.sections,
      type: data.type,
      webUrl: data.webUrl,
      resultUrl: data.resultUrl,
      tags: data.tags,
      domain: data.domain
    };

    return Board.updateOne(q, update);

  }

  static deleteBoard (boardId) {

    const q = { _id: boardId };

    return Board.updateOne(q, { $set: { deleted: true } });

  }

}

module.exports = BoardHandler;
