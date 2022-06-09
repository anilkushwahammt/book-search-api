const fetch = require('node-fetch')
const logger = require('../../config/logger')


/**
 * Takes the API Endpoint and Header and initiate the API communication and returns JSON response
 * @param {*} uri 
 * @param {*} header 
 * @returns apiResponse in JSON format
 */
const fetchAPIResponseJSON = async(uri,header) =>{
    try {
        const response = await fetch(uri,header);
        logger.info(`API Call respnse obtained for uri -${uri} `);
        return Promise.resolve(response.json());
    } catch (err) {
        logger.error(`Error occured while fetching API details for Books`)
        return Promise.reject(err);
    }
}


module.exports = {
    fetchAPIResponseJSON
}