const HTTPStatusCodeConstants = Object.freeze({
    //server errors
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    //client errors
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    //success errors
    OK: 200,
    CREATED: 201,
    ACCEPTED:202,

    FOUND : 302,
    NOT_MODIFIED: 304,

    MESSAGES: {
        //server errors
        INTERNAL_SERVER_ERROR: 'Internal server error',
        BAD_GATEWAY: 'Bad gateway',
        SERVICE_UNAVAILABLE: 'Service unavailable',
        GATEWAY_TIMEOUT: 'Gateway timeout',
        //client errors
        BAD_REQUEST: 'Bad Request',
        UNAUTHORIZED: 'Unauthorized',
        FORBIDDEN: 'Forbidden',
        NOT_FOUND: 'Not Found',
        //success errors
        OK: 'OK',
        CREATED: 'Created',
        ACCEPTED: 'Accepted'
    }

});

module.exports = HTTPStatusCodeConstants;