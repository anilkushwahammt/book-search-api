const fetch = require('node-fetch');
// search for books 
const searchForBooks = async(searchParams, page) => {
    try {
            
        const external_api = `https://run.mocky.io/v3/d7f02fdc-5591-4080-a163-95a08ce6895e`;
        let settings = { method: "Get" };
        const result = await fetch(external_api,settings);
        return Promise.resolve(result.json());

    } catch (err) {
        return Promise.reject(err);
    }
}


// exports
module.exports = {
    searchForBooks
}
