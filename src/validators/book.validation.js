const validator = require('./index')
const _ = require('lodash')
const Joi = require('@hapi/joi').extend(require('@joi/date'));
const joiSchemaRepo  = require('../schema')
const {SEARCH_QUERY_PRAMETERS} = require('../enum/book.enum')

 const validateBookSearchCriteria = async (filterCriteria) => {
    /**
     * Validate Allowed search query parameters
     */
    const allowedSearchQueryParmeters = Object.values(SEARCH_QUERY_PRAMETERS);
    for (key in filterCriteria) {
        validator.badRequest(!allowedSearchQueryParmeters.includes(key), `${key} is invalid query parameter`)
    }
    
    /**
     * validate Query schema
     */
    //const schemaValidationResult = Joi.validate(filterCriteria,joiSchemaRepo.searchQuerySchema);
    const schemaValidationResult = joiSchemaRepo.searchQuerySchema.validate(filterCriteria);
    validator.badRequest(schemaValidationResult && schemaValidationResult.error, _.get(schemaValidationResult.error, 'message'))
    return true
  }

  module.exports = {
    validateBookSearchCriteria
  }