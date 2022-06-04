const bookSearchService  = require('../../services/book')
/**
 * route: book/search
 * target: to search for books by search params
 */
 const searchBooks = async(req, res, next) => {
    try {

        const searchParams = req.params.searchParams;
        const page = req.params.page;

        const searchResult = await bookSearchService.searchForBooks(searchParams, page);
        res.send(searchResult);

    } catch (err) {
        next(err);
    }
}

// exports
module.exports = {
    searchBooks
 }