const DateSheetHandler = require('../app/dateSheet/dateSheetHandler');
const DateSheetUtil = require('../app/dateSheet/dateSheetUtil');
const BoardHandler = require('../app/board/boardHandler');
const SectionHandler = require('../app/section/sectionHandler');
require('../app/board/board');
require('../app/section/section');
require('../app/comment/comment');

const {
  cLog,
  database
} = require('../helpers/index');

const createDateSheetsForSingleSection = async () => {

  try {

    await database.connect();

    cLog.info(`createDateSheetsForSingleSection>>>> Get List of All date sheets`);

    const dateSheets = await DateSheetHandler.getAllDateSheets();

    cLog.success(`createDateSheetsForSingleSection>>>> Date sheets successfully fetched`, dateSheets);

    if (Array.isArray(dateSheets)) {

      for (const dateSheet of dateSheets) {

        if (dateSheet && Array.isArray(dateSheet.sections)) {

          for (const section of dateSheet.sections) {

            try {

              cLog.info(`<<<<<<<<<<<<<<<<<CREATING NEW DATE SHEET FOR BOARD:: ${dateSheet.board.title} SECTION:: ${section.title} YEAR:: ${dateSheet.year} EXAM TYPE:: ${dateSheet.examType}>>>>>>>>>>>>>>>>>>`);

              const newDateSheet = {
                boardId: dateSheet.board._id,
                sectionId: section._id,
                year: dateSheet.year,
                examType: dateSheet.examType,
                description: dateSheet.description,
                tags: dateSheet.tags,
                viewUrl: dateSheet.viewUrl,
                downloadUrl: dateSheet.downloadUrl,
                fileId: dateSheet.fileId
              };

              DateSheetUtil.getDateSheetNameAndPageId(dateSheet.board, section, newDateSheet);

              cLog.info(`createDateSheetsForSingleSection>>>> New date sheet data is:: `, JSON.stringify(newDateSheet));

              await DateSheetHandler.createDateSheet(newDateSheet);

              cLog.success(`<<<<<<<<<<<<<<<<<DATE SHEET IS SUCCESSFULLY CREATED FOR BOARD:: ${dateSheet.board.title} SECTION:: ${section.title} YEAR:: ${dateSheet.year} EXAM TYPE:: ${dateSheet.examType}>>>>>>>>>>>>>>>>>>`);

              cLog.warn(`createDateSheetsForSingleSection>>>> Deleting old date sheet with title:: ${dateSheet.title}`);

              await DateSheetHandler.deleteDateSheet(dateSheet._id);

              cLog.warn(`createDateSheetsForSingleSection>>>> Old date sheet successfully deleted with title:: ${dateSheet.title}`);

            } catch (error) {

              cLog.error(`createDateSheetsForSingleSection>>>> Failed to create date sheet, BOARD:: ${dateSheet.board.title} SECTION:: ${section.title} YEAR:: ${dateSheet.year} EXAM TYPE:: ${dateSheet.examType}`, error);

            }

          }

        }

      }

    }

  } catch (error) {

    cLog.error(`createDateSheetsForSingleSection>>>> Failed to create datesheets`, error);

  }

};

createDateSheetsForSingleSection();
