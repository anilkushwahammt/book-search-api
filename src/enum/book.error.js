const BAD_REQUEST = Object.freeze({
    HTTP_STATUS_CODE: 400,
    DESC: 'BAD_REQUEST'
})

const INTERNAL_ERROR = Object.freeze({
    HTTP_STATUS_CODE: 500,
    DESC: 'SERVER_INTERNAL_ERROR'
})
  
module.exports = {
    BAD_REQUEST,
    INTERNAL_ERROR
}
  