const Result = require('./result');
const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;

const {
  ResultEnums
} = require('../../enums');

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
      tags: data.tags,
      isBlocked: data.isBlocked
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

    const q = { section: sectionId, board: boardId, examType: ResultEnums.EXAM_TYPES.ANNUAL };

    return Result.find(q).select('year').sort({ year: -1 }).lean()
      .exec();

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

    return Result.findOne(q).populate('comments').lean()
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
      tags: data.tags
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

  static getLatestResults () {

    return Result.aggregate([
      {
        $addFields: {
          date: {
            $toDate: {
              $dateToString: {
                date: {
                  $dateFromParts: {
                    day: '$announceDate.day',
                    month: '$announceDate.month',
                    year: '$announceDate.year'
                  }
                },
                format: '%Y-%m-%d'
              }
            }
          }
        }
      },
      {
        $project: {
          status: 1,
          year: 1,
          section: 1,
          board: 1,
          diff_days: { $divide: [{ $subtract: [new Date(), '$date'] }, 1000 * 60 * 60 * 24] }
        }
      },
      {
        $match: {
          diff_days: { $lte: 30 }
        }
      },
      {
        $lookup:
            {
              from: 'boards',
              let: { board: '$board' },
              pipeline: [
                { $match: { _id: ObjectId('$$board') } },
                { $project: { title: 1 } }
              ],
              as: 'board'
            }
      },
      {
        $lookup:
            {
              from: 'sections',
              let: { section: '$section' },
              pipeline: [
                { $match: { _id: ObjectId('$$section') } },
                { $project: { title: 1, type: 1 } }
              ],
              as: 'section'
            }
      }
    ]);

  }

}

module.exports = ResultHandler;
