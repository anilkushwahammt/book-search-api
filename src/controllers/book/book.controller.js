const bookSearchService  = require('../../services/book')
const logger = require('../../config/logger')
/**
 * route:  book/search
 * target: takes search criteria in query parameter and based on this filter out book 
 *         search response obtained from third party api
 */
 const searchBooks = async(req, res, next) => {
    try {
        const filterCriteria = req.query;
        logger.info(`Request Received for Book Search with filter criteria: ${JSON.stringify(filterCriteria)}`);
        const filterdBooks = await bookSearchService.searchBooks(filterCriteria);  
        logger.info(`Book response obtained successfully with result count: ${filterdBooks.length} `);
        res.send(filterdBooks);
    } catch (err) {
        logger.error(`Error occured while searching for Books`, err)
        next(err);
    }
}

// exports
module.exports = {
    searchBooks
 }