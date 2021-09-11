const BoardHandler = require('../app/board/boardHandler');
const ResultManager = require('../app/result/resultManager');
const SectionManager = require('../app/section/sectionManager');

const {
  cLog,
  database
} = require('../helpers/index');

const classes = ['12th', '10th', '11th', '9th'];

const year = '2021';

const examType = 0;

const addResults = async () => {

  try {

    await database.connect();

    cLog.info(`addResults:: <<<<<<<<<<Adding results for classes:: `, classes, 'examType:: ', examType, 'year', year, '>>>>>>>>>>');

    for (const sectionTitle of classes) {

      if (sectionTitle) {

        const section = await SectionManager.getSectionByTitle(sectionTitle);

        if (section && section._id) {

          const boards = await BoardHandler.getBoardsBySectionId(section._id, true);

          if (Array.isArray(boards)) {

            for (const board of boards) {

              if (board && board._id) {

                const moreTags = getTagsList(sectionTitle, board.title, year, 'annual');

                const resultData = {
                  status: false,
                  sectionId: section._id,
                  boardId: board._id,
                  year,
                  announceDate: new Date(),
                  examType,
                  resultUrl: board.resultUrl,
                  description: getDescription(sectionTitle, board.title, year, 'annual'),
                  tags: [...board.tags, ...moreTags],
                  showAnnouncedDate: false
                };

                cLog.info(`addResults:: Adding result for class:: ${section && section.title}, board:: ${board && board.title}, year:: ${year}, examType:: ${examType}`);

                const response = await ResultManager.createResult(resultData);

                cLog.success(`addResults:: Result successfully added for class:: ${section && section.title}, board:: ${board && board.title}, year:: ${year}, examType:: ${examType}, response:: `, response);

              }

            }

          }

        }

      }

    }

    cLog.success(`addResults:: <<<<<<<<<<Results successfully added classes:: `, classes, 'examType:: ', examType, 'year', year, '>>>>>>>>>>');

    process.exit();

  } catch (error) {

    cLog.error(`addResults:: Error while adding results for classes:: `, classes, 'examType:: ', examType, 'year', year);

    process.exit();

  }

};

const getDescription = (sectionTitle, boardTitle, yearOfResult, examTypeOfResult) => {

  const description = `Matric and intermediate exams usually held in March-April and May-June respectively but this year due to COVID-19 exams were delayed and held in July-August instead. 
    Exams were taken for elective subjects only due to COVID-19 situations.
    <br/> ${boardTitle} board usually announce results after 3-4 months of exams but this time it is expected that ${boardTitle} board will announce
    ${sectionTitle} result on early basis as students are already very late for their next educational journeys.`;

  return description;

};

const getTagsList = (sectionTitle, boardTitle, yearOfResult, examTypeOfResult) => {

  const tags = [];

  tags.push(`${sectionTitle} result`);

  tags.push(`${sectionTitle} ${examTypeOfResult} result`);

  tags.push(`${sectionTitle} ${examTypeOfResult} exams result`);

  tags.push(`${sectionTitle} ${examTypeOfResult} result ${yearOfResult}`);

  tags.push(`${boardTitle} ${sectionTitle} ${examTypeOfResult} result ${yearOfResult}`);

  tags.push(`${boardTitle} board ${sectionTitle} ${examTypeOfResult} result ${yearOfResult}`);

  tags.push(`result of ${sectionTitle} class`);

  tags.push(`result of ${sectionTitle} class ${yearOfResult}`);

  tags.push(`result of ${boardTitle} ${sectionTitle} class ${yearOfResult}`);

  tags.push(`result of ${boardTitle} board ${sectionTitle} ${examTypeOfResult} exams ${yearOfResult}`);

  tags.push(`${sectionTitle} result`);

  return tags;

};

addResults();
