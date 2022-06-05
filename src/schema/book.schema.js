const Joi = require('@hapi/joi').extend(require('@joi/date'));
const {SEARCH_QUERY_PRAMETERS:QP} = require('../enum/book.enum')

const searchQuerySchema = Joi.object().keys({ 
    title: Joi.string(),
    isbn: Joi.string(),
    pageCount: Joi.number().integer().min(1),
    price: Joi.number().integer().min(1),
    date: Joi.date().format(['YYYY-MM-DD','YYYY']),
    currency: Joi.string(),
    thumbnailUrl: Joi.string(),
    shortDescription: Joi.string(),
    status: Joi.string(),
    author: Joi.string(),
    category: Joi.string()
  }); 

module.exports = {
    searchQuerySchema
}