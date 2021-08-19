const DateSheet = require('./dateSheet');

const {
  config
} = require('../../helpers');

class DateSheetHandler {

  static createDateSheet (data) {

    const dateSheet = new DateSheet({
      title: data.title,
      board: data.boardId,
      section: data.sectionId,
      year: data.year,
      examType: data.examType,
      description: data.description,
      tags: data.tags,
      viewUrl: data.viewUrl,
      downloadUrl: data.downloadUrl,
      fileId: data.fileId,
      pageId: data.pageId
    });

    return dateSheet.save();

  }

  static getDateSheetById (dateSheetId) {

    const q = { _id: dateSheetId };

    return DateSheet.findOne(q).populate('comments').populate('section').lean()
      .exec();

  }

  static getDateSheetByPageId (pageId) {

    const q = { pageId };

    return DateSheet.findOne(q).populate('board').populate('comments').populate('section')
      .lean()
      .exec();

  }

  static getDateSheetByBoardAndPageId (boardId, pageId) {

    const q = { board: boardId, pageId };

    return DateSheet.findOne(q).populate('board').populate('comments').populate('section')
      .lean()
      .exec();

  }

  static getAllDateSheets () {

    return DateSheet.find().populate('board').populate('sections').lean()
      .exec();

  }

  static getDateSheetYears (sectionId, boardId) {

    const q = { board: boardId, section: { $in: [sectionId] } };

    return DateSheet.distinct('year', q);

  }

  static getExamTypes (sectionId, boardId, year) {

    const q = { section: { $in: [sectionId] }, board: boardId, year };

    return DateSheet.distinct('examType', q);

  }

  static getDateSheetsByBoardId (boardId) {

    const q = { board: boardId };

    return DateSheet.find(q).sort('-year').populate('board').populate('section')
      .lean()
      .exec();

  }

  static getDateSheet (sectionId, boardId, year, examType) {

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

    return DateSheet.findOne(q).select(select).populate(pop).lean()
      .exec();

  }

  static updateDateSheet (dateSheetId, data) {

    const q = { _id: dateSheetId };

    const update = {
      section: data.section,
      board: data.boardId,
      year: data.year,
      examType: data.examType,
      description: data.description,
      tags: data.tags
    };

    return DateSheet.updateOne(q, update);

  }

  static updateDateSheetById (dateSheetId, update = {}) {

    const q = { _id: dateSheetId };

    return DateSheet.updateOne(q, update);

  }

  static deleteDateSheet (dateSheetId) {

    const q = { _id: dateSheetId };

    return DateSheet.deleteOne(q);

  }

  static getDateSheetsBySectionAndBoard (sectionId, boardId) {

    const q = { section: sectionId, board: boardId };

    const pop = [
      { path: 'section', select: 'title type' },
      { path: 'board', select: 'title key' }
    ];

    return DateSheet.find(q).select('board section year examType').populate(pop).lean()
      .exec();

  }

  static getLatestDateSheets () {

    return DateSheet.aggregate([
      {
        $project: {
          title: 1,
          pageId: 1,
          year: 1,
          section: 1,
          board: 1,
          examType: 1,
          diff_days: { $abs: { $divide: [{ $subtract: [new Date(), '$createdAt'] }, 1000 * 60 * 60 * 24] } }
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
                {
                  $project: {
                    title: 1, key: 1, province: 1, domain: 1
                  }
                }
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

module.exports = DateSheetHandler;
