const logger = require('../../config/logger')
const _ = require('lodash')
const {BAD_REQUEST} = require('../../enum/book.error')

const filteredBooks = async(bookResponse,filterCriteria) => {
    const filteredBook = bookResponse.filter(book => {
    try{
        let isValid = true;
        logger.debug(`filter process started for ${book.title}`);
        for (key in filterCriteria) {
           const data =  _.get(book, key);
           if(_.isEmpty(filterCriteria[key]) ){
            var err =  new Error(`${key} is invalid query parameter`);
            err.status = BAD_REQUEST.HTTP_STATUS_CODE;
            throw err;
           }
           if(_.isArray(data)){
               isValid = isValid && data.includes(filterCriteria[key]);
           }else if(key.includes('$date')){
                var comingDate = new Date(data);
                var reqDate = new Date(filterCriteria[key]);
                if(filterCriteria[key].length == 4){
                    isValid = isValid && comingDate.getFullYear() ==  reqDate.getFullYear();
                }else{
                    isValid = isValid && comingDate.getFullYear() ==  reqDate.getFullYear() && comingDate.getMonth() ==  reqDate.getMonth() && comingDate.getDay() ==  reqDate.getDay();
                }
           }else{
               isValid = isValid && data == filterCriteria[key];
           }
        }
        logger.debug(`filter process completed for ${book.title}`);
        return isValid;
    }catch{
        logger.error(`Error occured while processing book ${book.isbn}`);
        throw err;
    }
  });
  return filteredBook;
}
// exports
module.exports = {
    filteredBooks
}
