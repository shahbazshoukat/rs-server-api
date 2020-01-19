const Result = require("./result");

class ResultHandler {

  static createResult(data) {

    const result = new Result({
      status: data.status,
      section: data.sectionId,
      board: data.boardId,
      year:data.year,
      announceDate: data.announceDate,
      examType: data.examType,
      resultUrl:data.resultUrl,
      tags: data.tags,
      isBlocked: data.isBlocked
    });

    return result.save();

  }

  static getResultById(resultId) {

    const q = { _id: resultId };

    return Result.findOne(q).populate("board").populate("section").lean().exec();
  
  }

  static getAllResults() {

    return Result.find().populate("board").populate("section").lean().exec();

  }

  static getResultYears(sectionId, boardId) {

    const q = { section: sectionId, board: boardId };

    return Result.find(q).distinct("year").select("year").lean().exec();

  }

  static getResult(sectionId, boardId, year, examType) {

    const q = {section: sectionId, board: boardId, year: year, examType: examType};

    return Result.findOne(q).populate("section").populate("board").lean().exec();

  }

  static updateResult(resultId, data) {

    const q = { _id: resultId };

    const update = {
      status: data.status,
      section: data.sectionId,
      board: data.boardId,
      year:data.year,
      announceDate: data.announceDate,
      examType: data.examType,
      resultUrl:data.resultUrl,
      tags: data.tags
    };

    return Result.updateOne(q, update);

  }

  static updateResultById(resultId, update) {

    const q = { _id: resultId };

    return Result.updateOne(q, update);

  }


  static deleteResult(resultId) {

    const q = { _id: resultId};

    return Result.deleteOne(q);
  
  }

  static updateResultStatus(resultId, status) {

    const q = { _id: resultId};

    const update = { status: status };

    return Result.updateOne(q, update);

  }

}

module.exports = ResultHandler;
