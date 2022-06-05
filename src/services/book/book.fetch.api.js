const fetch = require('node-fetch');

/**
 * Takes the API Endpoint and Header and initiate the API communication and returns JSON response
 * @param {*} uri 
 * @param {*} header 
 * @returns apiResponse in JSON format
 */
const fetchAPIResponseJSON = async(uri,header) =>{
    try {
        const response = await fetch(uri,header);
        return Promise.resolve(response.json());
    } catch (err) {
        return Promise.reject(err);
    }
}


module.exports = {
    fetchAPIResponseJSON
}