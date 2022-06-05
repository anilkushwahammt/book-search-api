const bookSearchService  = require('../../services/book')
/**
 * route:  book/search
 * target: takes search criteria in query parameter and based on this filter out book 
 *         search response obtained from third party api
 */
 const searchBooks = async(req, res, next) => {
    try {
        const filterCriteria = req.query;
        const filterdBooks = await bookSearchService.searchBooks(filterCriteria);  
        res.send(filterdBooks);
    } catch (err) {
        next(err);
    }
}

// exports
module.exports = {
    searchBooks
 }