const SectionConstants = Object.freeze({
   Type: {
       TEST: 'test',
       CLASS: 'class'
   },

   MESSAGES: {
    SECTION_ADDED_SUCCESSFULLY: 'Section added successfully',
    SECTION_FETCHED_SUCCESSFULLY: 'Section fetched successfully',
    SECTIONS_FETCHED_SUCCESSFULLY: 'Sections fetched successfully',
    SECTION_UPDATED_SUCCESSFULLY: 'Section updated successfully',
    SECTION_DELETED_SUCCESSFULLY: 'Section deleted successfully',
    FAILED_TO_ADD_SECTION: 'Failed to add Section',
    SECTION_FETCHING_FAILED: 'Section fetching failed',
    SECTIONS_FETCHING_FAILED: 'Sections fetching failed',
    FAILED_TO_UPDATE_SECTION: 'Failed to update Section',
    FAILED_TO_DELETE_SECTION: 'Failed to delete Section',
    NO_DATA_FOUND_TO_ADD_SECTION: 'No data found to add section',
    INVALID_SECTION_ID: 'Invalid section id',
    INVALID_SECTION_TITLE: 'Invalid section title'
}
});

module.exports = SectionConstants;