const ModelPaper = require('./modelPaper');

const {
  config
} = require('../../helpers');

class ModelPaperHandler {

  static createModelPaper (data) {

    const modelPaper = new ModelPaper({
      title: data.title,
      board: data.boardId,
      section: data.sectionId,
      subject: data.subject,
      description: data.description,
      tags: data.tags,
      viewUrl: data.viewUrl,
      downloadUrl: data.downloadUrl,
      fileId: data.fileId,
      pageId: data.pageId
    });

    return modelPaper.save();

  }

  static getModelPaperById (modelPaperId) {

    const q = { _id: modelPaperId };

    return ModelPaper.findOne(q).populate('comments').populate('sections').lean()
      .exec();

  }

  static getModelPaperByPageId (pageId) {

    const q = { pageId };

    return ModelPaper.findOne(q).populate('board').populate('comments').populate('sections')
      .lean()
      .exec();

  }

  static getModelPaperByBoardAndPageId (boardId, pageId) {

    const q = { board: boardId, pageId };

    return ModelPaper.findOne(q).populate('board').populate('comments').populate('sections')
      .lean()
      .exec();

  }

  static getAllModelPapers () {

    return ModelPaper.find().populate('board').populate('sections').lean()
      .exec();

  }

  static getModelPapersByBoardId (boardId) {

    const q = { board: boardId };

    return ModelPaper.find(q).sort('-subject').populate('board').populate('section')
      .lean()
      .exec();

  }

  static getModelPaper (sectionId, boardId, subject) {

    const q = {
      section: sectionId, board: boardId, subject
    };

    const pop = [
      {
        path: 'comments',
        select: 'name text email createdAt -_id'
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

    const select = '-createdAt -updatedAt -views -pageId -fileId -deleted';

    return ModelPaper.findOne(q).select(select).populate(pop).lean()
      .exec();

  }

  static updateModelPaper (modelPaperId, data) {

    const q = { _id: modelPaperId };

    const update = {
      section: data.sectionId,
      board: data.boardId,
      subject: data.subject,
      description: data.description,
      tags: data.tags
    };

    return ModelPaper.updateOne(q, update);

  }

  static updateModelPaperById (modelPaperId, update = {}) {

    const q = { _id: modelPaperId };

    return ModelPaper.updateOne(q, update);

  }

  static deleteModelPaper (modelPaperId) {

    const q = { _id: modelPaperId };

    return ModelPaper.deleteOne(q);

  }

  static getModelPapersBySectionAndBoard (sectionId, boardId) {

    const q = { section: sectionId, board: boardId };

    const pop = [
      { path: 'sections', select: 'title type' },
      { path: 'board', select: 'title key' }
    ];

    return ModelPaper.find(q).select('board sections year examType').populate(pop).lean()
      .exec();

  }

  static getLatestModelPapers () {

    return ModelPaper.aggregate([
      {
        $project: {
          title: 1,
          section: 1,
          board: 1,
          subject: 1,
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

module.exports = ModelPaperHandler;
