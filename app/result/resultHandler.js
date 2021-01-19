const Result = require('./result');

const {
  config
} = require('../../helpers');

class ResultHandler {

  static createResult (data) {

    const result = new Result({
      status: data.status,
      section: data.sectionId,
      board: data.boardId,
      year: data.year,
      announceDate: data.announceDate,
      examType: data.examType,
      resultUrl: data.resultUrl,
      description: data.description,
      tags: data.tags,
      isBlocked: data.isBlocked,
      showAnnouncedDate: data.showAnnouncedDate
    });

    return result.save();

  }

  static getResultById (resultId) {

    const q = { _id: resultId };

    return Result.findOne(q).populate('comments').lean()
      .exec();

  }

  static getAllResults () {

    return Result.find().populate('board').populate('section').lean()
      .exec();

  }

  static getResultYears (sectionId, boardId) {

    const q = { section: sectionId, board: boardId };

    return Result.distinct('year', q);

  }

  static getExamTypes (sectionId, boardId, year) {

    const q = { section: sectionId, board: boardId, year };

    return Result.distinct('examType', q);

  }

  static getResultsByBoardId (boardId) {

    const q = { board: boardId };

    return Result.find(q).populate('board').populate('section').lean()
      .exec();

  }

  static getResult (sectionId, boardId, year, examType) {

    const q = {
      section: sectionId, board: boardId, year, examType
    };

    const pop = [
      {
        path: 'comments',
        select: 'name text createdAt -_id'
      },
      {
        path: 'board',
        select: 'title description webUrl -_id'
      },
      {
        path: 'section',
        select: 'title -_id'
      }
    ];

    const select = '-createdAt -updatedAt -views';

    return Result.findOne(q).select(select).populate(pop).lean()
      .exec();

  }

  static updateResult (resultId, data) {

    const q = { _id: resultId };

    const update = {
      status: data.status,
      section: data.sectionId,
      board: data.boardId,
      year: data.year,
      announceDate: data.announceDate,
      examType: data.examType,
      resultUrl: data.resultUrl,
      description: data.description,
      tags: data.tags,
      showAnnouncedDate: data.showAnnouncedDate
    };

    return Result.updateOne(q, update);

  }

  static updateResultById (resultId, update = {}) {

    const q = { _id: resultId };

    return Result.updateOne(q, update);

  }

  static deleteResult (resultId) {

    const q = { _id: resultId };

    return Result.deleteOne(q);

  }

  static updateResultStatus (resultId, status) {

    const q = { _id: resultId };

    const update = { status };

    return Result.updateOne(q, update);

  }

  static updateAllResults (q, update = {}, options = {}) {

    // return Result.deleteMany(q);

  }

  static updateResultsByBoardId (q, update = {}, options = {}) {

    return Result.updateMany(q, update);

  }

  static getResultsBySectionAndBoard (sectionId, boardId) {

    const q = { section: sectionId, board: boardId };

    const pop = [
      { path: 'section', select: 'title type' },
      { path: 'board', select: 'title key' }
    ];

    return Result.find(q).select('board section year examType').populate(pop).lean()
      .exec();

  }

  static getLatestResults () {

    return Result.aggregate([
      {
        $project: {
          status: 1,
          year: 1,
          section: 1,
          board: 1,
          examType: 1,
          diff_days: { $abs: { $divide: [{ $subtract: [new Date(), '$announceDate'] }, 1000 * 60 * 60 * 24] } }
        }
      },
      {
        $match: {
          diff_days: { $lte: config.result.days || 30 }
        }
      },
      {
        $sort: {
          diff_days: 1
        }
      },
      {
        $lookup:
            {
              from: 'boards',
              let: { board: '$board' },
              pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$board'] } } },
                { $project: { title: 1, key: 1, province: 1 } }
              ],
              as: 'board'
            }
      },
      {
        $unwind: '$board'
      },
      {
        $lookup:
            {
              from: 'sections',
              let: { section: '$section' },
              pipeline: [
                { $match: { $expr: { $eq: ['$_id', '$$section'] } } },
                { $project: { title: 1, type: 1 } }
              ],
              as: 'section'
            }
      },
      {
        $unwind: '$section'
      }
    ]);

  }

}

module.exports = ResultHandler;
