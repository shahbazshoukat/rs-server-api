const BoardHandler = require('../app/board/boardHandler');
const BoardManager = require('../app/board/boardManager');
const GoogleDriveHandler = require('../app/utils/googleDriveAPI');

const {
  cLog,
  config,
  database
} = require('../helpers/index');

const createFoldersOnGoogleDrive = async () => {

  try {

    cLog.info('Connecting to DB');

    await database.connect();

    cLog.success('DB connected successfully');

    cLog.info(`Getting List of All boards`);

    const boards = await BoardHandler.getAllBoards();

    cLog.success(`Boards successfully fetched`);

    if (Array.isArray(boards)) {

      for (const board of boards) {

        if (board) {

          cLog.warn(`\n\n\n=========================== **************${board && board.title}************** ===========================\n\n\n`);

          await BoardManager.createBoardDirectoriesOnGoogleDrive(board);

        }

      }

    }

  } catch (error) {

    cLog.error(`Error while creating folders on google drive`);

  }

};

createFoldersOnGoogleDrive();
