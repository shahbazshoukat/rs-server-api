const BoardHandler = require('../app/board/boardHandler');
const BoardUtil = require('../app/board/boardUtil');
const BoardManager = require("../app/board/boardManager");

const {
    cLog,
    database
} = require('../helpers/index');

const checkBoardsWebsites = async() => {

    try {

        await database.connect();

        cLog.info(`checkBoardsWebsites>>>> Get List of All boards`);

        const boards = await BoardHandler.getAllBoards();

        cLog.success(`checkBoardsWebsites>>>> Boards successfully fetched`);

        if (Array.isArray(boards)) {

            for (const board of boards) {

                if (board) {

                    try {

                        cLog.info(`checkBoardsWebsites>>>> checking website blockage for ${board && board.title}`);

                        const isBlocked = await BoardUtil.checkBlockedWebsite(board.resultUrl);

                        cLog.info(`checkBoardsWebsites>>>> website blockage status for ${board && board.title} is ${isBlocked}`);

                        await BoardManager.updateBoardById(board._id, { $set: { isBlocked: isBlocked } });

                    } catch (error) {

                        cLog.error(`checkBoardsWebsites>>>> Error while checking website blockage status for ${board && board.title}`);

                    }

                }

            }

        }

    } catch (error) {

        cLog.error(`checkBoardsWebsites>>>> Error while checking website blockage status`);

    }

}

checkBoardsWebsites();
