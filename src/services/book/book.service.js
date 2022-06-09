const bookFetchAPI  = require('./book.fetch.api')
const bookFilterService  = require('./book.filter.dynamic')
const logger = require('../../config/logger')
require('dotenv').config();
const _ = require('lodash')
const {client:redis} = require('./../../config/redis')
const CACHE_DURATION = process.env.REDIS_CACHE_DURATION || 86400;

const BOOK_URI = process.env.BOOK_URI || 'https://run.mocky.io/v3/d7f02fdc-5591-4080-a163-95a08ce6895e'
/**
 * It fetch the Book details from the mentioned URI
 * After fetching this it filters out the response obtained from API.
 * Filtertion is done based on the specified filter criteria
 * @param {*} filterCriteria 
 * @returns 
 */
const searchBooks = async(filterCriteria) => {
   
    const bookHeader = { method: "Get" };
    let bookResponse =  await redis.getAsync(BOOK_URI);

    if(_.isNil(bookResponse)){
        bookResponse = await bookFetchAPI.fetchAPIResponseJSON(BOOK_URI,bookHeader);
        redis.setex(BOOK_URI, CACHE_DURATION, JSON.stringify(bookResponse));
    }else{
        bookResponse = JSON.parse(bookResponse);
        logger.info(` Book Response Served From Cache `);
    }
    const filteredBooks = await bookFilterService.filteredBooks(bookResponse,filterCriteria);
    return filteredBooks;
}


// exports
module.exports = {
    searchBooks
}
