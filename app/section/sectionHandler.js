const Section = require('./section');

class SectionHandler {

  static createSection (data) {

    const section = new Section({
      title: data.title,
      type: data.type
    });

    return section.save();

  }

  static getSection (sectionId) {

    const q = { _id: sectionId, deleted: false };

    return Section.findOne(q).lean().exec();

  }

  static getSectionByTitle (title) {

    const q = { title, deleted: false };

    return Section.findOne(q).lean().exec();

  }

  static getAllSections () {

    return Section.find({ deleted: false }).lean().exec();

  }

  static updateSection (sectionId, data) {

    const q = { _id: sectionId };

    const update = {
      title: data.title,
      type: data.type
    };

    return Section.updateOne(q, update);

  }

  static deleteSection (sectionId) {

    const q = { _id: sectionId };

    return Section.updateOne(q, { $set: { deleted: true } });

  }

}

module.exports = SectionHandler;
