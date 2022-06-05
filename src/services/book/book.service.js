const bookFetchAPI  = require('./book.fetch.api')
const bookFilterService  = require('./book.filter')

/**
 * It fetch the Book details from the mentioned URI
 * After fetching this it filters out the response obtained from API.
 * Filtertion is done based on the specified filter criteria
 * @param {*} filterCriteria 
 * @returns 
 */
const searchBooks = async(filterCriteria) => {
   
    const bookURI = `https://run.mocky.io/v3/d7f02fdc-5591-4080-a163-95a08ce6895e`;
    const bookHeader = { method: "Get" };

    const bookResponse = await bookFetchAPI.fetchAPIResponseJSON(bookURI,bookHeader);
    const filteredBooks = await bookFilterService.filteredBooks(bookResponse,filterCriteria);
    return filteredBooks;
}


// exports
module.exports = {
    searchBooks
}
