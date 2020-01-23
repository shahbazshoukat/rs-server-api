const BoardConstants = Object.freeze({
  EXAM_TYPES: {
    ANNUAL: 'annual',
    SUPPLY: 'supply',
    TEST: 'test',
    RETOTAL: 'retotal'
  },
  API_MODE: {
    API: 'api',
    SCRAPING: 'scraping',
    URL: 'url'
  },
  REQUEST_TYPE: {
    POST: 'post',
    GET: 'get'
  },
  MESSAGES: {
    BOARD_ADDED_SUCCESSFULLY: 'Board added successfully',
    BOARD_FETCHED_SUCCESSFULLY: 'Board fetched successfully',
    BOARDS_FETCHED_SUCCESSFULLY: 'Boards fetched successfully',
    BOARD_UPDATED_SUCCESSFULLY: 'Board updated successfully',
    BOARD_DELETED_SUCCESSFULLY: 'Board deleted successfully',
    FAILED_TO_ADD_BOARD: 'Failed to add board',
    BOARD_FETCHING_FAILED: 'Board fetching failed',
    BOARDS_FETCHING_FAILED: 'Boards fetching failed',
    FAILED_TO_UPDATE_BOARD: 'Failed to update board',
    FAILED_TO_DELETE_BOARD: 'Failed to delete board',
    NO_DATA_FOUND_TO_ADD_BOARD: 'No data found to add board',
    INVALID_BOARD_DATA: 'Invalid board data',
    NO_BOARD_ID_FOUND: 'No board Id found',
    INVALID_BOARD_ID: 'Invalid board id',
    INVALID_BOARD_TITLE: 'Invalid board title',
    INVALID_BOARD_PROVINCE: 'Invalid board province',
    INVALID_BOARD_CITY: 'Invalid board city',
    INVALID_BOARD_EXAMTYPE: 'Invalid board exam type',
    INVALID_BOARD_SECTIONS: 'Invalid board sections',
    INVALID_BOARD_API_MODE: 'Invalid board api mode',
    INVALID_BOARD_WEB_URL: 'Invalid board web url',
    INVALID_BOARD_RESULT_URL: 'Invalid board result url',
    INVALID_BOARD_API_URL: 'Invalid board api url',
    INVALID_BOARD_REQUEST_TYPE: 'Invalid board request type',
    INVALID_SECTION_ID: 'Invalid section id',
    INVALID_SECTION_TITLE: 'Invalid section title',
    INVALID_BOARD_KEY: 'Invalid board key',
    SECTION_NOT_FOUND: 'Section not found'
  },
  BOARDS: {
    BISE_LAHORE: 'BISE-Lahore',
    BISE_GUJRANWALA: 'BISE-Gujranwala',
    BISE_SAHIWAL: 'BISE-Sahiwal'
  }
});

module.exports = BoardConstants;
