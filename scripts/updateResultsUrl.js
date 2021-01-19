const BoardHandler = require('../app/board/boardHandler');
const BoardUtil = require('../app/board/boardUtil');
const BoardManager = require("../app/board/boardManager");
const ResultManager = require("../app/result/resultManager");
const ResultHandler = require("../app/result/resultHandler");

const {
    cLog,
    database
} = require('../helpers/index');

const updateResultsUrl = async() => {

    try {

        await database.connect();

        cLog.info(`updateResultsUrl>>>> Get List of All boards`);

        const boards = await BoardHandler.getAllBoards();

        cLog.success(`updateResultsUrl>>>> Boards successfully fetched`);

        if (Array.isArray(boards)) {

            for (const board of boards) {

                if (board) {

                    try {

                        cLog.warn(`<<<<<<<<<<<<<<<<<UPDATING ${board && board.title}>>>>>>>>>>>>>>>>>>`);

                        cLog.info(`updateResultsUrl>>>> Updating isBlocked and resultUrl for all results of board:: ${board && board.title}`);

                        await ResultHandler.updateResultsByBoardId({ board: board._id }, { $set: { isBlocked: board.isBlocked, resultUrl: board.resultUrl } });

                        cLog.success(`updateResultsUrl>>>> isBlocked and resultUrl for all results of board:: ${board && board.title} is successfully updated`);

                        cLog.warn(`<<<<<<<<<<<<<<<<<${board && board.title} UPDATE FINISHED>>>>>>>>>>>>>>>>>>`);

                    } catch (error) {

                        cLog.error(`updateResultsUrl>>>> Failed to update isBlocked and resultUrl for all results of board:: ${board && board.title}`);

                    }

                }

            }

        }

    } catch (error) {

        cLog.error(`updateResultsUrl>>>> Error while updating isBlocked and resultUrl for all results of all boards`);

    }

}

updateResultsUrl();
