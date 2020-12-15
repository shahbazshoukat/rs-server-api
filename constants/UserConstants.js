const User = Object.freeze({

  MESSAGES: {
    INVALID_USER: 'Invalid User',
    INVALID_USER_NAME: 'Invalid User name',
    INVALID_USER_EMAIL: 'Invalid User email',
    INVALID_DOMAIN: 'Environment name can contain only Alphanumeric and - and must start with alphanumeric',
    INVALID_USER_PASSWORD: 'Password must be minimum 8 characters, with at-least one letter and number.',
    INVALID_USER_AVATAR: 'Invalid User avatar',
    INVALID_USER_ID: 'Invalid User id',
    THIS_EMAIL_IS_ALREADY_TAKEN: 'This email is already taken',
    THIS_DOMAIN_IS_ALREADY_TAKEN: 'This domain is already taken',
    DOMAIN_NAME_RESTRICTED: 'Domain name restricted',
    USER_NOT_FOUND: 'User not found',
    INVALID_USER_CREDENTIALS: 'Invalid User credentials',
    USER_UPDATED_SUCCESSFULLY: 'User updated successfully',
    USER_REMOVED_SUCCESSFULLY: 'User removed successfully',
    FAILED_TO_UPDATE_USER: 'Failed to update User',
    FAILED_TO_REMOVE_USER: 'Failed to remove User',
    USER_ACCOUNT_SUCCESSFULLY_CREATED: 'User account successfully created',
    FAILED_TO_CREATE_USER_ACCOUNT: 'Failed to create User account',
    FAILED_TO_FIND_USER: 'Failed to find User',
    USERS_FETCHED_SUCCESSFULLY: 'Users fetched successfully',
    USER_FETCHED_SUCCESSFULLY: 'User fetched successfully',
    USER_LOGGED_IN_SUCCESSFULLY: 'User logged in successfully',
    LOGGED_OUT_SUCCESSFULLY: 'Logged out successfully',
    FAILED_TO_LOGOUT: 'Failed to logout',
    USER_VERIFIED_SUCCESSFULLY: 'User verified successfully',
    USER_ALREADY_VERIFIED: 'User already verified',
    INVALID_TOKEN: 'Invalid token',
    EMAIL_NOT_VERIFIED: 'Email not verified',
    OPERATION_NOT_ALLOWED: 'Operation not allowed'
  }

});

module.exports = User;
