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
      isBlocked: data.isBlocked
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

  static getAllBoards () {

    return Board.find({ deleted: false }).populate('sections').lean().exec();

  }

  static getBoardsBySectionId (sectionId) {

    const q = { sections: sectionId, deleted: false };

    return Board.find(q).select('key title province city resultUrl type').lean().exec();

  }

  static getBoardBySectionId (sectionId) {

    const q = { sections: sectionId, deleted: false };

    return Board.findOne(q).select('key title province city resultUrl type comments tags').populate('comments').lean()
      .exec();

  }

  static getBoardByProvince (province) {

    const q = { province, deleted: false };

    return Board.find(q).select('title key').lean().exec();

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
      tags: data.tags
    };

    return Board.updateOne(q, update);

  }

  static deleteBoard (boardId) {

    const q = { _id: boardId };

    return Board.updateOne(q, { $set: { deleted: true } });

  }

}

module.exports = BoardHandler;
