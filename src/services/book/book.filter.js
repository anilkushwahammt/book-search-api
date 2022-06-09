const logger = require('../../config/logger')
const {SEARCH_QUERY_PRAMETERS:QP} = require('../../enum/book.enum')

const filteredBooks = async(bookResponse,filterCriteria) => {
    const filteredBook = bookResponse.filter(book => {
    try{
        let isValid = true;
        logger.debug(`filter process started for ${book.title}`);
        for (key in filterCriteria) {
            logger.debug(`filter process started for  key ${key}`);
            switch (key) {
                case QP.TITLE:
                case QP.ISBN: 
                case QP.PAGE_COUNT: 
                case QP.THUMBNAIL_URL: 
                case QP.SHORT_DESCRIPTION:
                case QP.STATUS:
                        isValid = isValid && book[key] == filterCriteria[key];
                    break
                case QP.DATE:
                    var comingDate = new Date(book.published.$date);
                    var reqDate = new Date(filterCriteria[key]);
                    if(filterCriteria[key].length == 4){
                        isValid = isValid && comingDate.getFullYear() ==  reqDate.getFullYear();
                    }else{
                        isValid = isValid && comingDate.getFullYear() ==  reqDate.getFullYear() && comingDate.getMonth() ==  reqDate.getMonth() && comingDate.getDay() ==  reqDate.getDay();
                    }
                    break;
                case QP.PRICE:
                case QP.CURRENCY:
                    isValid = isValid && book.published[key] == (filterCriteria[key]);
                    break;
                case QP.AUTHOR:
                    isValid = isValid && book['authors'].includes(filterCriteria[key]);
                    break;
                case QP.CATEGORY:
                    isValid = isValid && book['categories'].includes(filterCriteria[key]);
                    break;
            }
            logger.debug(`filter process done for  key ${key}`);
        }
        logger.debug(`filter process completed for ${book.title}`);
        return isValid;
    }catch{
        logger.error(`Error occured while processing book ${book.isbn}`);
    }
  });
  return filteredBook;
}
// exports
module.exports = {
    filteredBooks
}
