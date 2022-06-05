const logger = require('../../config/logger')

const filteredBooks = async(bookResponse,filterCriteria) => {
    const filteredBook = bookResponse.filter(book => {
    try{
        let isValid = true;
        logger.debug(`filter process started for ${book.title}`);
        for (key in filterCriteria) {
            logger.debug(`filter process started for  key ${key}`);
            switch (key) {
                case 'title': 
                case 'isbn': 
                case 'pageCount': 
                case 'thumbnailUrl': 
                case 'shortDescription':
                case 'status':
                        isValid = isValid && book[key] == filterCriteria[key];
                    break
                case 'date':
                    var comingDate = new Date(book.published.$date);
                    var reqDate = new Date(filters[key]);
                    if(filterCriteria[key].length == 4){
                        isValid = isValid && comingDate.getFullYear() ==  reqDate.getFullYear();
                    }else{
                        isValid = isValid && comingDate.getFullYear() ==  reqDate.getFullYear() && comingDate.getMonth() ==  reqDate.getMonth() && comingDate.getDay() ==  reqDate.getDay();
                    }
                    break;
                case 'price':
                case 'currency':
                    isValid = isValid && book.published[key] == (filterCriteria[key]);
                    break;
                case 'authors':
                case 'categories':
                    isValid = isValid && book[key].includes(filterCriteria[key]);
                    break;
            }
            logger.debug(`filter process done for  key ${key}`);
        }
        logger.debug(`filter process completed for ${book.title}`);
        return isValid;
    }catch{
        logger.error(`Error occured while processing book ${book.isbn}`, err);
    }
  });
  return filteredBook;
}
// exports
module.exports = {
    filteredBooks
}
